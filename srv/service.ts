import cds from '@sap/cds'

/**
 * TravelService — implementation of srv/service.cds
 *
 * Demonstrates:
 *  - Side-effect logic (auto-calculated estimated cost)
 *  - A practical GenAI feature (LLM-based risk classification on free text)
 *  - Custom actions (approve/reject) writing an audit trail
 *  - Event-driven integration (publishing to SAP Event Mesh on approval)
 */
export = class TravelService extends cds.ApplicationService {
  async init() {
    const { TravelRequests, ApprovalLogs } = this.entities

    // --- Side effect: auto-calculate estimated cost from destination + trip length ---
    this.before(['CREATE', 'UPDATE'], TravelRequests, async (req) => {
      const { destination_ID, startDate, endDate } = req.data
      if (destination_ID && startDate && endDate) {
        const dest = await SELECT.one.from('traveldesk.Destinations').where({ ID: destination_ID })
        if (dest?.costIndex) {
          const days = Math.max(
            1,
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86_400_000
          )
          req.data.estimatedCost = Math.round(days * dest.costIndex * 100) / 100
        }
      }
    })

    // --- GenAI feature: classify travel risk from the free-text purpose field ---
    this.before('CREATE', TravelRequests, async (req) => {
      if (req.data.purpose) {
        const { riskFlag, suggestion } = await getAiSuggestion(req.data.purpose)
        req.data.aiRiskFlag = riskFlag
        req.data.aiSuggestion = suggestion
      }
    })

    // --- Approve action: update status, write audit log, publish event ---
    this.on('approve', TravelRequests, async (req) => {
      const id = req.params[0].ID
      await UPDATE(TravelRequests, id).with({ status: 'Approved' })
      await INSERT.into(ApprovalLogs).entries({
        request_ID: id,
        approver: req.user?.id ?? 'unknown',
        action: 'Approved',
        comment: req.data.comment,
        timestamp: new Date().toISOString()
      })

      // Event-driven integration: notify any downstream system (finance, HR, etc.)
      const messaging = await cds.connect.to('messaging')
      await messaging.emit('travel/request/approved', { ID: id })

      return SELECT.one.from(TravelRequests).where({ ID: id })
    })

    // --- Reject action: same pattern, no event needed for this demo ---
    this.on('rejectRequest', TravelRequests, async (req) => {
      const id = req.params[0].ID
      await UPDATE(TravelRequests, id).with({ status: 'Rejected' })
      await INSERT.into(ApprovalLogs).entries({
        request_ID: id,
        approver: req.user?.id ?? 'unknown',
        action: 'Rejected',
        comment: req.data.comment,
        timestamp: new Date().toISOString()
      })
      return SELECT.one.from(TravelRequests).where({ ID: id })
    })

    return super.init()
  }
}

/**
 * Calls an LLM API to classify business-travel risk from free text.
 * API key is read from an environment variable — never hardcoded.
 * Falls back gracefully if no key is configured (e.g. local dev without secrets).
 */
async function getAiSuggestion(
  purposeText: string
): Promise<{ riskFlag: string; suggestion: string }> {
  const apiKey = process.env.LLM_API_KEY
  if (!apiKey) {
    return { riskFlag: 'Unknown', suggestion: 'AI suggestion unavailable — no API key configured.' }
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 150,
        messages: [
          {
            role: 'user',
            content:
              `Classify the business risk of this travel purpose as Low, Medium, or High, ` +
              `and give a one-sentence rationale. Respond ONLY as JSON: ` +
              `{"riskFlag": "...", "suggestion": "..."}\n\nPurpose: "${purposeText}"`
          }
        ]
      })
    })
    const data = await response.json()
    const text = data.content?.[0]?.text ?? '{}'
    const parsed = JSON.parse(text)
    return {
      riskFlag: parsed.riskFlag ?? 'Unknown',
      suggestion: parsed.suggestion ?? ''
    }
  } catch (err) {
    return {
      riskFlag: 'Unknown',
      suggestion: `AI suggestion failed: ${(err as Error).message}`
    }
  }
}
