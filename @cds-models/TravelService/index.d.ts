// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as __ from './../_';

export default class {
}

// entity 'TravelRequest'
export declare function _TravelRequestAspect<TBase extends new (...args: any[]) => object>(Base: TBase): {
  new (...args: any[]): {
    ID?: __.Key<string>
    createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    createdBy?: _.User | null
    modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    modifiedBy?: _.User | null
    employee?: __.Association.to<Employee> | null
    employee_ID?: string | null
    destination?: __.Association.to<Destination> | null
    destination_ID?: string | null
    startDate?: __.CdsDate | null
    endDate?: __.CdsDate | null
    purpose?: string | null
    estimatedCost?: number | null
    status?: string | null
    aiRiskFlag?: string | null
    aiSuggestion?: string | null
    approvals?: __.Composition.of.many<ApprovalLogs>
  } & InstanceType<TBase>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<TravelRequest>;
    readonly elements: __.ElementsOf<TravelRequest>;
    readonly actions: {
      approve:  {
        // positional
        (comment: string | null): TravelRequest
        // named
        ({comment}: {comment?: string | null}): TravelRequest
        // metadata (do not use)
        __parameters: {comment?: string | null}, __returns: TravelRequest, __self: TravelRequest
        kind: 'action'
      }
      rejectRequest:  {
        // positional
        (comment: string | null): TravelRequest
        // named
        ({comment}: {comment?: string | null}): TravelRequest
        // metadata (do not use)
        __parameters: {comment?: string | null}, __returns: TravelRequest, __self: TravelRequest
        kind: 'action'
      }
    };
};
export class TravelRequest extends _TravelRequestAspect(__.Entity) {
  static drafts: __.DraftOf<TravelRequest>
}
export class TravelRequests extends Array<TravelRequest> {
  static drafts: __.DraftsOf<TravelRequest>
  $count?: number
}

// entity 'Destination'
export declare function _DestinationAspect<TBase extends new (...args: any[]) => object>(Base: TBase): {
  new (...args: any[]): {
    ID?: __.Key<string>
    city?: string | null
    country?: string | null
    costIndex?: number | null
  } & InstanceType<TBase>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<Destination>;
    readonly elements: __.ElementsOf<Destination>;
    readonly actions: globalThis.Record<never, never>;
};
export class Destination extends _DestinationAspect(__.Entity) {
}
export class Destinations extends Array<Destination> {
  $count?: number
}

// entity 'Employee'
export declare function _EmployeeAspect<TBase extends new (...args: any[]) => object>(Base: TBase): {
  new (...args: any[]): {
    ID?: __.Key<string>
    name?: string | null
    email?: string | null
    costCenter?: string | null
    manager?: __.Association.to<Employee> | null
    manager_ID?: string | null
  } & InstanceType<TBase>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<Employee>;
    readonly elements: __.ElementsOf<Employee>;
    readonly actions: globalThis.Record<never, never>;
};
export class Employee extends _EmployeeAspect(__.Entity) {
}
export class Employees extends Array<Employee> {
  $count?: number
}

// entity 'ApprovalLog'
export declare function _ApprovalLogAspect<TBase extends new (...args: any[]) => object>(Base: TBase): {
  new (...args: any[]): {
    ID?: __.Key<string>
    request?: __.Association.to<TravelRequest> | null
    request_ID?: string | null
    approver?: string | null
    action?: string | null
    comment?: string | null
    timestamp?: __.CdsDateTime | null
  } & InstanceType<TBase>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<ApprovalLog>;
    readonly elements: __.ElementsOf<ApprovalLog>;
    readonly actions: globalThis.Record<never, never>;
};
export class ApprovalLog extends _ApprovalLogAspect(__.Entity) {
  static drafts: __.DraftOf<ApprovalLog>
}
export class ApprovalLogs extends Array<ApprovalLog> {
  static drafts: __.DraftsOf<ApprovalLog>
  $count?: number
}
