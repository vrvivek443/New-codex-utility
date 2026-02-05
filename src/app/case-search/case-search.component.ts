import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { CaseSearchResponse } from '../interfaces/model';
import { MasterDataStateService } from '../services/master-data.service';

declare var Lobibox: any;

@Component({
  selector: 'app-case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css'],
})
export class CaseSearchComponent {
  caseNumber: string = '';
  errorMessage: string = '';
  caseDetails: any = null;
  caseFullDetails: any;
  showDetailsCard = false;
  showLetterCard = false;
  _masterDataList: any[] = [];
  _areaTypeDataList: any[] = [];
  _complaintTypeDataList: any[] = [];
  _coreServiceTypeDataList: any[] = [];
  _serviceTypeDataList: any[] = [];
  _dispositionTypeDataList: any[] = [];
  _phoneTypeDataList: any[] = [];
  _priorityTypeDataList: any[] = [];
  _programDataList: any[] = [];
  _programTypeDataList: any[] = [];
  _programSubTypeDataList: any[] = [];
  _relationshipTypeDataList: any[] = [];
  _tempRelationshipTypeData: any[] = [];
  _salutationTypeDataList: any[] = [];
  _personTypeDataList: any[] = [];
  _serviceAreaTypeDataList: any[] = [];
  _streetTypeDataList: any[] = [];
  _streetMasterDataList: any[] = [];
  _actionListDataList: any[] = [];
  _sourceDataList: any[] = [];
  _sourceTypeDataList: any[] = [];
  _sourceCodeTypeDataList: any[] = [];
  _cdbgDataList: any[] = [];
  _caseStatusSelectdata: any[] = [];
  _caseStatusDetailSelectdata: any[] = [];
  _caseStatusTypeDataList: any[] = [];
  _casePhaseTypeDataList: any[] = [];
  _casePhaseTypeBPDataList: any[] = [];
  _caseStatusTypeBPDataList: any[] = [];
  _caseStatusDetailBPDataList: any[] = [];
  _caseStatusDetailTypeDataList: any[] = [];
  _taskStatusTypeDataList: any[] = [];
  _actionTypeDataList: any[] = [];
  _primaryInspectorDataList: any[] = [];
  _inspectorList: any[] = [];
  _caseStatus: any[] = [];
  letters = [
    { id: 1, name: 'Acknowledgement Letter' },
    { id: 2, name: 'Follow-up Letter' },
    { id: 3, name: 'Closure Letter' },
  ];

  selectedLetter: any;

  constructor(
    private loginService: LoginServiceService,
    private masterDataState: MasterDataStateService,
  ) {}

  searchCase() {
    this.errorMessage = '';
    this.caseDetails = null;

    if (!this.caseNumber || this.caseNumber.trim() === '') {
      this.errorMessage = 'Please enter a case number.';
      return;
    }

    this.loginService
      .getCaseSearch([this.caseNumber])
      .subscribe((data: CaseSearchResponse) => {
        if (data?.status === 'SUCCESS') {
          // console.log(data.status);
          if (data?.data.length > 0) {
            console.log(data?.data);
            this.caseDetails = {
              caseNumber: this.caseNumber,
              id: data?.data[0].id,
              createdBy: data?.data[0].createdBy,
            };
            this.caseFullDetails = data?.data[0];
          } else {
            Lobibox.notify('error', {
              pauseDelayOnHover: true,
              continueDelayOnInactiveTab: false,
              position: 'top right',
              icon: 'bx bx-check-circle',
              msg: 'Data not available',
            });
          }
        } else {
          this.caseDetails = null;
        }
      });
  }

  viewDetails() {
    this.showDetailsCard = true;
    console.log(this.caseFullDetails);
  }

  generateLetter() {
    this.showLetterCard = true;
    console.log('Generating letter for:', this.caseDetails.caseNumber);
    // generate/download letter
  }

  copied = false;

  copyCaseNumber() {
    if (!this.caseNumber) return;

    navigator.clipboard.writeText(this.caseNumber).then(() => {
      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 1000);
    });
  }

  loadMasterData() {
    // this.masterDataState.loadAll().subscribe(() => {

    /** 1. MASTER CATEGORY LISTS */
    this.masterDataState.masterData$.subscribe(
      (r) => (this._masterDataList = r),
    );
    this.masterDataState.caseStatusType$.subscribe(
      (r) => (this._caseStatusTypeDataList = r),
    );
    this.masterDataState.casePhaseType$.subscribe(
      (r) => (this._casePhaseTypeDataList = r),
    );
    this.masterDataState.caseStatusDetail$.subscribe(
      (r) => (this._caseStatusDetailTypeDataList = r),
    );
    this.masterDataState.sourceType$.subscribe(
      (r) => (this._sourceDataList = r),
    );
    this.masterDataState.areaType$.subscribe(
      (r) => (this._areaTypeDataList = r),
    );
    this.masterDataState.complaintType$.subscribe(
      (r) => (this._complaintTypeDataList = r),
    );
    this.masterDataState.coreServiceType$.subscribe(
      (r) => (this._coreServiceTypeDataList = r),
    );
    this.masterDataState.dispositionType$.subscribe(
      (r) => (this._dispositionTypeDataList = r),
    );
    this.masterDataState.phoneType$.subscribe(
      (r) => (this._phoneTypeDataList = r),
    );
    this.masterDataState.priorityType$.subscribe(
      (r) => (this._priorityTypeDataList = r),
    );
    this.masterDataState.programType$.subscribe(
      (r) => (this._programDataList = r),
    );
    this.masterDataState.programSubType$.subscribe(
      (r) => (this._programSubTypeDataList = r),
    );
    this.masterDataState.relationshipType$.subscribe(
      (r) => (this._tempRelationshipTypeData = r),
    );
    this.masterDataState.salutationType$.subscribe(
      (r) => (this._salutationTypeDataList = r),
    );
    this.masterDataState.serviceAreaType$.subscribe(
      (r) => (this._serviceAreaTypeDataList = r),
    );
    this.masterDataState.streetType$.subscribe(
      (r) => (this._streetTypeDataList = r),
    );
    this.masterDataState.personType$.subscribe((r) => {
      this._personTypeDataList = r;
    });
    this.masterDataState.cdbgType$.subscribe((r) => (this._cdbgDataList = r));
    this.masterDataState.actionType$.subscribe(
      (r) => (this._actionTypeDataList = r),
    );
    // this.masterDataState.violationStatusType$.subscribe(r => this._violationStatusTypeDataList = r);
    this.masterDataState.taskStatusType$.subscribe(
      (r) => (this._taskStatusTypeDataList = r),
    );
    this.masterDataState.sourceCodeType$.subscribe(
      (r) => (this._sourceCodeTypeDataList = r),
    );
    this.masterDataState.serviceType$.subscribe(
      (r) => (this._serviceTypeDataList = r),
    );

    /** 2. OTHER API LISTS */
    this.masterDataState.streetMaster$.subscribe(
      (r) => (this._streetMasterDataList = r),
    );
    this.masterDataState.caseStatus$.subscribe((r) => (this._caseStatus = r));
    this.masterDataState.actionList$.subscribe(
      (r) => (this._actionListDataList = r),
    );
    this.masterDataState.inspectorList$.subscribe(
      (r) => (this._inspectorList = r),
    );
    // this.masterDataState.supervisorList$.subscribe(r => this._supervisorList = r);

    /** 3. INLINE — VIOLATION TREE BUILDING & JSTREE INIT */
  }
}
