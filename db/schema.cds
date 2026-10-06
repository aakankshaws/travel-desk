namespace traveldesk;

using { managed, cuid } from '@sap/cds/common';

entity Employees : cuid {
  name       : String(100);
  email      : String(100);
  costCenter : String(10);
  manager    : Association to Employees;
}

entity Destinations : cuid {
  city      : String(100);
  country   : String(100);
  costIndex : Decimal(5,2); // used to auto-calculate estimated cost per day
}

entity TravelRequests : cuid, managed {
  employee      : Association to Employees;
  destination   : Association to Destinations;
  startDate     : Date;
  endDate       : Date;
  purpose       : String(500);
  estimatedCost : Decimal(10,2);
  status        : String(20) default 'Draft'; // Draft | Submitted | Approved | Rejected

  aiRiskFlag    : String(20);
  aiSuggestion  : String(500);

  approvals     : Composition of many ApprovalLogs on approvals.request = $self;
}

entity ApprovalLogs : cuid {
  request   : Association to TravelRequests;
  approver  : String(100);
  action    : String(20);
  comment   : String(500);
  timestamp : DateTime;
}
