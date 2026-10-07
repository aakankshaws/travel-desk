# TravelDesk

Employee travel request & approval app. Built as a portfolio project to demonstrate a modern SAP full-stack skillset: **CAP (Node.js) + TypeScript, OData V4, Fiori Elements, XSUAA, SAP Event Mesh, and a practical GenAI feature.**

## Architecture


## What this project demonstrates
- **CDS data modeling** — `db/schema.cds`: associations, compositions, managed aspect
- **OData V4 service** — auto-generated from `srv/service.cds`, with draft handling enabled
- **TypeScript CAP handlers** — `srv/service.ts`: typed event handlers, not plain JS
- **Fiori Elements annotations** — `app/travelrequests/annotations.cds`: List Report, Object Page, value help, side effects, custom action buttons
- **XSUAA role-based access** — `xs-security.json`: Employee vs Manager scopes, enforced via `@restrict` in the service definition
- **SAP Event Mesh integration** — approval action publishes a `travel/request/approved` event for downstream systems (local dev uses CAP's built-in `local-messaging` emulator)
- **Practical GenAI feature** — free-text `purpose` field is classified for travel risk via an LLM API call, with graceful fallback if no API key is set
- **Custom actions with audit trail** — Approve/Reject buttons write to a composition-based `ApprovalLogs` entity, visible as a sub-table on the Object Page

## Run it locally
```bash
npm install --legacy-peer-deps
cds watch
```
This starts the service with an in-memory SQLite database and sample data pre-loaded (see `db/data/`). Open the Fiori preview at the URL `cds watch` prints (typically `http://localhost:4004`).

Mock users for local testing (see `package.json` → `cds.requires.auth.users`):
- `manager` / `manager123` — Manager + Employee roles (can approve/reject)
- `employee` / `employee123` — Employee role only

To exercise the GenAI feature locally, set an API key before starting:
```bash
export LLM_API_KEY=your_key_here
cds watch
```
Without a key set, the app still runs — `aiRiskFlag` will show `"Unknown"` with an explanatory message rather than failing.

## Deploy to SAP BTP (Cloud Foundry)
1. Add production config: `cds add hana,xsuaa,mta`
2. Build: `cds build --production`
3. Provision an XSUAA service instance using `xs-security.json`
4. Deploy: `cf push` (or let the GitHub Actions pipeline do it — see below)

## CI/CD
`.github/workflows/deploy.yml` builds and deploys automatically on push to `main`. Set these repository secrets first: `CF_API`, `CF_USERNAME`, `CF_PASSWORD`, `CF_ORG`, `CF_SPACE`.

## Event Mesh (optional, next step)
```bash
cds add event-mesh --for production
```
Then bind an SAP Integration Suite advanced event mesh instance in your BTP subaccount. The `approve` action already emits `travel/request/approved` — no code change needed once the service is bound.

## What I'd add with more time
- CAP Java variant of the same service (to demonstrate both supported CAP languages)
- A second consuming app subscribed to the `travel/request/approved` event
- Full RAP business object on a BTP ABAP Environment trial for a "call an S/4HANA-style backend" scenario
- A Joule Skill exposing the `approve` action as a conversational capability (SAP Build 30-day trial)

## Notes on this build
This project was built and debugged hands-on, including resolving real CAP/BTP issues along the way: npm peer-dependency conflicts between `@sap/cds` and companion packages, CAP's filename convention for implementation files, a reserved-method naming collision (`reject` conflicts with a base class method), and the distinction between CAP's `NEW` vs `CREATE` lifecycle events on draft-enabled entities.
