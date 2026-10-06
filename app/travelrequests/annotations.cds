using TravelService as service from '../../srv/service';

annotate service.TravelRequests with @(
  UI: {
    HeaderInfo: {
      TypeName       : 'Travel Request',
      TypeNamePlural : 'Travel Requests',
      Title          : { Value: purpose }
    },
    SelectionFields: [ status, destination_ID ],
    LineItem: [
      { Value: purpose },
      { Value: destination.city, Label: 'Destination' },
      { Value: startDate },
      { Value: endDate },
      { Value: estimatedCost },
      { Value: status },
      { Value: aiRiskFlag, Label: 'AI Risk Flag' }
    ],
    Facets: [
      { $Type: 'UI.ReferenceFacet', Label: 'General',   Target: '@UI.FieldGroup#General' },
      { $Type: 'UI.ReferenceFacet', Label: 'Approvals', Target: 'approvals/@UI.LineItem' }
    ],
    FieldGroup #General: {
      Data: [
        { Value: employee_ID },
        { Value: destination_ID },
        { Value: startDate },
        { Value: endDate },
        { Value: purpose },
        { Value: estimatedCost },
        { Value: aiRiskFlag,   Label: 'AI Risk Flag' },
        { Value: aiSuggestion, Label: 'AI Suggestion' }
      ]
    }
  }
);

annotate service.TravelRequests with {
  destination @(
    Common.ValueList: {
      CollectionPath: 'Destinations',
      Parameters: [
        { $Type: 'Common.ValueListParameterInOut',      LocalDataProperty: destination_ID, ValueListProperty: 'ID'   },
        { $Type: 'Common.ValueListParameterDisplayOnly', ValueListProperty: 'city' }
      ]
    },
    Common.SideEffects: {
      TargetProperties: ['estimatedCost']
    }
  )
};

annotate service.ApprovalLogs with @(
  UI.LineItem: [
    { Value: approver },
    { Value: action },
    { Value: comment },
    { Value: timestamp }
  ]
);
annotate service.TravelRequests with @(
  UI.Identification: [
    { $Type: 'UI.DataFieldForAction', Action: 'TravelService.approve',        Label: 'Approve' },
    { $Type: 'UI.DataFieldForAction', Action: 'TravelService.rejectRequest',  Label: 'Reject'  }
  ]
);