import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MasterDataStateService {

  private loaded = false;
  private url = "http://localhost:8001/api"
  private loadedSubject = new BehaviorSubject<boolean>(false);
  loaded$ = this.loadedSubject.asObservable();

  // RAW master category list
  masterData$ = new BehaviorSubject<any[]>([]);

  // SPLIT CATEGORIES
  caseStatusType$      = new BehaviorSubject<any[]>([]);
  casePhaseType$       = new BehaviorSubject<any[]>([]);
  caseStatusDetail$    = new BehaviorSubject<any[]>([]);
  sourceType$          = new BehaviorSubject<any[]>([]);
  areaType$            = new BehaviorSubject<any[]>([]);
  complaintType$       = new BehaviorSubject<any[]>([]);
  coreServiceType$     = new BehaviorSubject<any[]>([]);
  dispositionType$     = new BehaviorSubject<any[]>([]);
  phoneType$           = new BehaviorSubject<any[]>([]);
  priorityType$        = new BehaviorSubject<any[]>([]);
  programType$         = new BehaviorSubject<any[]>([]);
  programSubType$      = new BehaviorSubject<any[]>([]);
  relationshipType$    = new BehaviorSubject<any[]>([]);
  salutationType$      = new BehaviorSubject<any[]>([]);
  serviceAreaType$     = new BehaviorSubject<any[]>([]);
  streetType$          = new BehaviorSubject<any[]>([]);
  personType$          = new BehaviorSubject<any[]>([]);
  cdbgType$            = new BehaviorSubject<any[]>([]);
  actionType$          = new BehaviorSubject<any[]>([]);
  violationStatusType$ = new BehaviorSubject<any[]>([]);
  taskStatusType$      = new BehaviorSubject<any[]>([]);
  sourceCodeType$      = new BehaviorSubject<any[]>([]);
  serviceType$         = new BehaviorSubject<any[]>([]);

  // OTHER APIs
  streetMaster$   = new BehaviorSubject<any[]>([]);
  caseStatus$     = new BehaviorSubject<any[]>([]);
  actionList$     = new BehaviorSubject<any[]>([]);
  violationList$  = new BehaviorSubject<any[]>([]);
  inspectorList$  = new BehaviorSubject<any[]>([]);
  supervisorList$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  /** Load all APIs once */
  loadAll(): Observable<boolean> {

    if (this.loaded) return of(true);

    const master$ = this.http.get<any>(
      this. url + '/categorydata/getAll'
    );

    const street$ = this.http.get<any>(
      this. url + '/streetmaster/getAll'
    );

    const action$ = this.http.get<any>(
      this. url + '/actions/getAll'
    );

    const violation$ = this.http.get<any>(
      this. url + '/violationtype/getAll'
    );

    const caseStatus$ = this.http.get<any>(
      this. url + '/assignmentmap/caseStatus'
    );

    const inspector$ = this.http.get<any>(
      this. url + '/user/getAllInspector'
    );

    const supervisor$ = this.http.get<any>(
      this. url + '/user/getAllSupervisor'
    );

    return forkJoin([
      master$, street$, caseStatus$, action$, violation$, inspector$, supervisor$
    ]).pipe(
      tap(([masterRes, streetRes, caseRes, actionRes, violationRes, inspectorRes, supervisorRes]) => {

        const masterList = masterRes?.data || [];
        this.masterData$.next(masterList);
        this.splitCategoryModule(masterList);

        this.streetMaster$.next(streetRes?.data || []);
        this.caseStatus$.next(caseRes?.data || []);
        this.actionList$.next(actionRes?.data || []);
        this.violationList$.next(violationRes?.data || []);
        this.inspectorList$.next(inspectorRes?.data || []);
        this.supervisorList$.next(supervisorRes?.data || []);

        this.loaded = true;
        this.loadedSubject.next(true);
      }),
      map(() => true)
    );
  }

  /** Split Category Module */
  private splitCategoryModule(list: any[]) {

    [
      this.caseStatusType$, this.casePhaseType$, this.caseStatusDetail$,
      this.sourceType$, this.areaType$, this.complaintType$,
      this.coreServiceType$, this.dispositionType$, this.phoneType$,
      this.priorityType$, this.programType$, this.programSubType$,
      this.relationshipType$, this.salutationType$, this.serviceAreaType$,
      this.streetType$, this.personType$, this.cdbgType$,
      this.actionType$, this.violationStatusType$, this.taskStatusType$,
      this.sourceCodeType$, this.serviceType$
    ].forEach(s => s.next([]));

    list.filter(x => x.status).forEach(e => {
      switch (e.category) {
        case 'CaseStatusType':       this.push(this.caseStatusType$, e); break;
        case 'CasePhase':        this.push(this.casePhaseType$, e); break;
        case 'CaseStatusDetail':     this.push(this.caseStatusDetail$, e); break;
        case 'SourceType':           this.push(this.sourceType$, e); break;
        case 'AreaType':             this.push(this.areaType$, e); break;
        case 'ComplaintType':        this.push(this.complaintType$, e); break;
        case 'CoreServiceType':      this.push(this.coreServiceType$, e); break;
        case 'DispositionType':      this.push(this.dispositionType$, e); break;
        case 'PhoneType':            this.push(this.phoneType$, e); break;
        case 'PriorityType':         this.push(this.priorityType$, e); break;
        case 'ProgramType':          this.push(this.programType$, e); break;
        case 'ProgramSubType':       this.push(this.programSubType$, e); break;
        case 'RelationshipType':     this.push(this.relationshipType$, e); break;
        case 'SalutationType':       this.push(this.salutationType$, e); break;
        case 'ServiceAreaType':      this.push(this.serviceAreaType$, e); break;
        case 'StreetType':           this.push(this.streetType$, e); break;
        case 'PersonType':           this.push(this.personType$, e); break;
        case 'CBDGType':             this.push(this.cdbgType$, e); break;
        case 'ActionType':           this.push(this.actionType$, e); break;
        case 'ViolationStatusType':  this.push(this.violationStatusType$, e); break;
        case 'TaskStatus':           this.push(this.taskStatusType$, e); break;
        case 'SourceCodeType':       this.push(this.sourceCodeType$, e); break;
        case 'ServiceType':          this.push(this.serviceType$, e); break;
      }
    });
  }

  private push(subject: BehaviorSubject<any[]>, item: any) {
    subject.next([...subject.value, item]);
  }
}
