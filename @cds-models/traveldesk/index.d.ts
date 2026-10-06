// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as __ from './../_';

// entity 'Employee'
export declare function _EmployeeAspect<TBase extends new (...args: any[]) => object>(Base: TBase): {
  new (...args: any[]): {
    ID?: __.Key<string>
    name?: string | null
    email?: string | null
    costCenter?: string | null
    manager?: __.Association.to<Employee> | null
    manager_ID?: string | null
  } & InstanceType<ReturnType<typeof _._cuidAspect<TBase>>>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<Employee> & typeof _.cuid.keys;
    readonly elements: __.ElementsOf<Employee>;
    readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
};
export class Employee extends _EmployeeAspect(__.Entity) {
}
export class Employees extends Array<Employee> {
  $count?: number
}

// entity 'Destination'
export declare function _DestinationAspect<TBase extends new (...args: any[]) => object>(Base: TBase): {
  new (...args: any[]): {
    ID?: __.Key<string>
    city?: string | null
    country?: string | null
    costIndex?: number | null
  } & InstanceType<ReturnType<typeof _._cuidAspect<TBase>>>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<Destination> & typeof _.cuid.keys;
    readonly elements: __.ElementsOf<Destination>;
    readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
};
export class Destination extends _DestinationAspect(__.Entity) {
}
export class Destinations extends Array<Destination> {
  $count?: number
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
  } & InstanceType<ReturnType<typeof _._cuidAspect<ReturnType<typeof _._managedAspect<TBase>>>>>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<TravelRequest> & typeof _.cuid.keys;
    readonly elements: __.ElementsOf<TravelRequest>;
    readonly actions: typeof _.cuid.actions & typeof _.managed.actions & globalThis.Record<never, never>;
};
export class TravelRequest extends _TravelRequestAspect(__.Entity) {
}
export class TravelRequests extends Array<TravelRequest> {
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
  } & InstanceType<ReturnType<typeof _._cuidAspect<TBase>>>
    readonly kind: 'entity';
    readonly keys: __.KeysOf<ApprovalLog> & typeof _.cuid.keys;
    readonly elements: __.ElementsOf<ApprovalLog>;
    readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
};
export class ApprovalLog extends _ApprovalLogAspect(__.Entity) {
}
export class ApprovalLogs extends Array<ApprovalLog> {
  $count?: number
}
