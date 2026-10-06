using { traveldesk as db } from '../db/schema';

@requires: 'authenticated-user'
service TravelService @(path: '/travel') {

  @odata.draft.enabled
  @restrict: [
    { grant: ['READ', 'CREATE', 'UPDATE', 'DELETE'], to: 'Employee' },
    { grant: ['approve', 'reject'],                  to: 'Manager'  }
  ]
  entity TravelRequests as projection on db.TravelRequests actions {
    action approve(comment: String) returns TravelRequests;
    action rejectRequest(comment: String) returns TravelRequests;
  };

  @readonly entity Destinations as projection on db.Destinations;
  @readonly entity Employees    as projection on db.Employees;
}
