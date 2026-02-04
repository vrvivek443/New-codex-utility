import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { CaseSearchResponse } from '../interfaces/model';

declare var Lobibox: any;

@Component({
  selector: 'app-case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css']
})
export class CaseSearchComponent {

  caseNumber: string = '';
  errorMessage: string = '';
  caseDetails: any = null;
  caseFullDetails: any; 
  showDetailsCard = false;

  constructor(private loginService: LoginServiceService) {}

  searchCase() {
    this.errorMessage = '';
    this.caseDetails = null;

    if (!this.caseNumber || this.caseNumber.trim() === '') {
      this.errorMessage = 'Please enter a case number.';
      return;
    }

    this.loginService.getCaseSearch([this.caseNumber]).subscribe((data: CaseSearchResponse) => {
      if (data?.status === 'SUCCESS') {
        // console.log(data.status);
        if(data?.data.length > 0) {
          console.log(data?.data);
        this.caseDetails = {
          caseNumber: this.caseNumber,
          id: data?.data[0].id,
          createdBy: data?.data[0].createdBy,
        };
        this.caseFullDetails = data?.data;
      }
      else {
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
    })
    

    // Mock response – replace with API call
    
  }

  viewDetails() {
    this.showDetailsCard = true;
  //   this.caseFullDetails = {
  //   source: 'Admin Code Email',
  //   sourceDetail: '',
  //   receivedDate: '2025-01-10',
  //   program: 'Abandoned Shopping Carts',
  //   programDetail: '',
  //   primaryInspector: '',
  //   secondaryInspector: '',
  //   caseOutcome: '',
  //   priority: 'Priority 2 (72-hours)',
  //   cbdgCaseType: '',
  //   followUpDate: '',
  //   enforcementRemedy: '',
  //   service: '',
  //   openDate: '2025-01-10',
  //   closeDate: '',
  //   casePhase: 'Intake',
  //   caseStatus: 'Case Validation',
  //   bpMonitoring: 'No'
  // };
    // navigate or open modal
  }

  generateLetter() {
    console.log('Generating letter for:', this.caseDetails.caseNumber);
    // generate/download letter
  }
}
