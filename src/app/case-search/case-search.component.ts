import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { CaseSearchResponse } from '../interfaces/model';
import { MasterDataStateService } from '../services/master-data.service';

declare var Lobibox: any;
declare var bootstrap: any;

@Component({
  selector: 'app-case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css'],
})
export class CaseSearchComponent {
  caseFields = [
  { label: 'Source*', key: 'sourcecode', transform: (val: any) => this.getSourceName(val) },
  { label: 'Source Detail', key: 'sourceCodeType', transform: (val: any) => this.getSourceDetailName(val) },
  { label: 'Received Date', key: 'receivedDate' },
  { label: 'Program', key: 'programcode', transform: (val: any) => this.getProgramListName(val) },
  { label: 'Program Type', key: 'programCodeType', transform: (val: any) => this.getProgramSubListName(val) },
  { label: 'Priority*', key: 'prioritycode', transform: (val: any) => this.getPriorityName(val) },
  { label: 'CBDG Case Type', key: 'cdbgcasetype' },
  { label: 'Follow-up Date', key: 'cudate' },
  { label: 'Enforcement Remedy', key: 'coreservicecode', transform: (val: any) => this.getServiceType(val) },
  { label: 'Case Outcome', key: 'dispositioncode', transform: (val: any) => this.getDispositionCode(val) },
  { label: 'Open Date', key: 'opendate' },
  { label: 'Close Date', key: 'closedate' },
  { label: 'Case Phase', key: 'casePhase', transform: (val: any) => this.getCasePhaseName(val) },
  { label: 'Case Status', key: 'casestatus', transform: (val: any) => this.getCaseStatusName(val) },
  { label: 'BP Monitoring', key: 'bpMonitor', transform: (val: any) => val === 'Y' ? 'Yes' : val === 'N' ? 'No' : val },
  { label: 'Inspector 1', key: 'inspector1id', transform: (val: any) => this.getInspectorName(val) },
  { label: 'Inspector 2', key: 'inspector2id', transform: (val: any) => this.getInspectorName(val) },
  { label: 'Street Number', key: 'caseaddress.streetNumber' },
  { label: 'Street Direction', key: 'caseaddress.streetDirection' },
  { label: 'Street Name', key: 'caseaddress.streetName' },
  { label: 'Street Type', key: 'caseaddress.streetType' },
  { label: 'Unit Number', key: 'caseaddress.unitNumber' },
  { label: 'Census Tract', key: 'caseaddress.censusTract' },
  { label: 'District', key: 'caseaddress.district' },
  { label: 'Number Of Units', key: 'caseaddress.numberOfUnits' },
  { label: 'Map Coordinates', key: 'caseaddress.mapCoordinates' },
  { label: 'Housing Permit Number', key: 'caseaddress.housingPermitNumber' },
  { label: 'Owner Name', key: 'caseaddress.ownerName' },
  { label: 'Owner Street', key: 'caseaddress.ownerStreet' },
  { label: 'Owner City/State/Zip', key: 'caseaddress.ownerCityStateZip' },
  { label: 'Owner Phone', key: 'caseaddress.ownerPhone' },
  { label: 'Other Name', key: 'caseaddress.otherName' },
  { label: 'Other Address', key: 'caseaddress.otherAddress' },
  { label: 'Other City/State/Zip', key: 'caseaddress.otherCityStateZip' },
  { label: 'Building Permit Number', key: 'caseaddress.buildingPermitNumber' },
  { label: 'Tax Rate Area', key: 'caseaddress.taxRateArea' },
  { label: 'Lot Number', key: 'caseaddress.lotNo' },
  { label: 'Tract Number', key: 'caseaddress.tractNo' },
  { label: 'Property RSN', key: 'caseaddress.propertyRSN' },
  { label: 'In Amanda', key: 'caseaddress.inAmanda' },
  { label: 'Amanda District', key: 'caseaddress.amandaDistrict' },
  { label: 'Stamp Date', key: 'caseaddress.stampDate' },
  { label: 'People RSN', key: 'caseaddress.peopleRSN' },
  { label: 'Comments', key: 'caseaddress.comments' },
  { label: 'Property RSN Amanda', key: 'caseaddress.propertyRSNAmanda' },
  { label: 'People RSN Amanda', key: 'caseaddress.peopleRSNAmanda' },
  { label: 'Status', key: 'caseaddress.status' },
  { label: 'State', key: 'caseaddress.state' },
  { label: 'City', key: 'caseaddress.city' },
  { label: 'Zip', key: 'caseaddress.zip' },
  { label: 'APN', key: 'caseaddress.apn' }
];


  caseNumber: string = '';
  caseid!: number;
  errorMessage: string = '';
  caseDetails: any = null;
  caseFullDetails: any;
  casePerson: any[] = [];
  selectedPersonIds: number[] = [];
  isPersonError: boolean = false;
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

  selectedLetter: any;

  constructor(
    private loginService: LoginServiceService,
    private masterDataState: MasterDataStateService,
  ) {}

  ngOnInit() {
    this.loadMasterData();
  }

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
            console.log(data?.data[0]);
            this.caseDetails = {
              caseNumber: this.caseNumber,
              id: data?.data[0].id,
              createdBy: data?.data[0].createdBy,
            };
            this.caseFullDetails = data?.data[0];
            this.caseid = this.caseFullDetails.id;
            this.casePerson = this.caseFullDetails.casePerson;
            console.log(this.caseFullDetails.caseaddress.ownerName);
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
  }

  generateLetter() {
    this.showLetterCard = true;
  }

  cancelDetails() {
  this.showDetailsCard = false;
}

cancelLetter() {
  this.showLetterCard = false;
  this.selectedLetter = null;
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

  getNestedValue(obj: any, key: string) {
    if (!obj || !key) return '';
    return key
      .split('.')
      .reduce(
        (acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''),
        obj,
      );
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
    console.log(this._coreServiceTypeDataList);
    this.masterDataState.dispositionType$.subscribe(
      (r) => (this._dispositionTypeDataList = r),
    );
    console.log(this._dispositionTypeDataList);
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
    console.log(this._sourceCodeTypeDataList)
    this.masterDataState.serviceType$.subscribe(
      (r) => (this._serviceTypeDataList = r),
    );

    /** 2. OTHER API LISTS */
    this.masterDataState.streetMaster$.subscribe(
      (r) => (this._streetMasterDataList = r),
    );
    this.masterDataState.caseStatus$.subscribe((r) => (this._caseStatus = r));
    this.masterDataState.actionList$.subscribe(
      (r) =>
        (this._actionListDataList = r.filter((a: any) => a.actionType === 'L')),
    );

    this.masterDataState.inspectorList$.subscribe(
      (r) => (this._inspectorList = r),
    );
    // this.masterDataState.supervisorList$.subscribe(r => this._supervisorList = r);

    /** 3. INLINE — VIOLATION TREE BUILDING & JSTREE INIT */
  }

  getSourceName(code: any) {
    return this._sourceDataList.find((a: any) => a.code === code)?.value;
  }

  getSourceDetailName(code: any) {
    return this._sourceCodeTypeDataList.find((a: any) => a.code === code)?.value;
  }

  getProgramListName(code: any) {
    return this._programDataList.find((a: any) => a.code === code)?.value;
  }

  getProgramSubListName(code: any) {
    return this._programSubTypeDataList.find((a: any) => a.code === code)?.value;
  }

  getPriorityName(code: any){
    return this._priorityTypeDataList.find((a: any) => a.code === code)?.value;
  }

  getCaseStatusName(code: any){
    return this._caseStatusTypeDataList.find((a: any) => a.code === code)?.value;
  }

  getCasePhaseName(code: any){
    return this._casePhaseTypeDataList.find((a: any) => a.code === code)?.value;
  }

  getDispositionCode(code: any) {
    return this._dispositionTypeDataList.find((a: any) => a.code === code)?.value;
  }

  getServiceType(code: any) {
    return this._coreServiceTypeDataList.find((a: any) => a.code === code)?.value;
  }

  getInspectorName(id: number) {
    let item: any = this._inspectorList.filter((itm) => itm.id == id);
    if (item != null && item.length > 0) {
      return item[0].name;
    } else {
      return '';
    }
  }

  viewGenerateLetter(id: any) {
    console.log(id);
    console.log(this.caseid);
    console.log(this._actionListDataList);
    const today = new Date().toISOString().split('T')[0];
    const action = {
      id: -1,
      actionCode: id,
      actionDate: today,
      actionType: 'L',
      actionVersion: 0,
      caseMaster: {
        id: this.caseid,
      },
      caseActionFiles: [],
      comments: '',
      createdBy: '',
      createdOn: today,
      isRead: false,
      modifiedBy: '',
      modifiedOn: '',
      readDate: '',
      routeToInspectorId: null,
      status: false,
      mailedDate: '',
      letterPersons: this.selectedPersonIds.join(','),
      isInspectorRequired: false,
    };

    this.loginService.upsertAction(action).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        Lobibox.notify('success', {
          pauseDelayOnHover: true,
          continueDelayOnInactiveTab: false,
          position: 'top right',
          icon: 'bx bx-check-circle',
          msg: 'Action created. Loading Letter...',
        });
        const physicalName = data.data[0].caseActions[0].physicalFileName;
        this.selectedPersonIds = [];
        this.isPersonError = false;
        this.selectedLetter = null;
        this.showLetterCard = false;
        console.log(physicalName)
        if (physicalName) {
          window.open(physicalName, '_blank');
        }
      } else {
        Lobibox.notify('success', {
          pauseDelayOnHover: true,
          continueDelayOnInactiveTab: false,
          position: 'top right',
          icon: 'bx bx-check-circle',
          msg: data.errorMessage ?? 'Unable to create the action',
        });
      }
    });
  }

  closePersonModal() {
    this.selectedPersonIds = [];
    this.isPersonError = false;
    this.selectedLetter = null;

    const modal = bootstrap.Modal.getInstance(
      document.getElementById('personSelectionModal')!,
    );
    modal?.hide();
  }

  saveSelectedPerson() {
    if (this.selectedPersonIds.length === 0) {
      this.isPersonError = true;
      return;
    }

    this.isPersonError = false;

    console.log('Selected Persons:', this.selectedPersonIds);

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('personSelectionModal')!,
    );
    modal?.hide();
  }

  onPersonCheckboxChange(event: any, personId: number) {
    if (event.target.checked) {
      this.selectedPersonIds.push(personId);
    } else {
      this.selectedPersonIds = this.selectedPersonIds.filter(
        (id) => id !== personId,
      );
    }
  }

  getPersonType(code: any) {
    const personType = this._personTypeDataList.find(
      (e: any) => e.code === code,
    )?.value;
    return personType;
  }

  getRelationShipName(code: any) {
    const relationData = this._relationshipTypeDataList.find(
      (e: any) => e.code === code,
    )?.value;
    if (relationData) return relationData;
    else return '';
  }

  onLetterChange(event: any) {
    if (event & this.selectedLetter) {
      const modalElement = document.getElementById('personSelectionModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
