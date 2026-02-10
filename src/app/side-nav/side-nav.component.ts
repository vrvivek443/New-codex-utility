import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  _userEmail: string = '';
  _roleName: string = '';
  public _noofNotices: any = 0;
  _notices: any[] = [];
  _count: any;
  _newNoticeCount: any;
  _user: any

  constructor(private authService: MsalService, private loginService: LoginServiceService) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString); // Convert JSON string to object
      this._userEmail = user.name;
      this._roleName = user.role.rolename
    }
    console.log(this._userEmail);
    console.log(this._roleName)
    // this.notifyProfile();
    
    this.notifyProfile();
  }

  logoutUser() {
    localStorage.clear();
    const account = this.authService.instance.getActiveAccount();
    this.authService.instance.logoutRedirect({
      account: account,
      postLogoutRedirectUri: window.location.origin + '/memberlogout',
    });
  }

  getTimespan(d: any) {
    if (d == null || d == undefined)
      return "";
    return "2 sec";
  }

  notifyProfile()
  {
    this.loadMessageForUser();
    // setInterval(() => {
    //   this.loadMessageForUser();
    // }, 10000);
    this.loginService.currentNoticeCount.subscribe(list => {
      this._newNoticeCount = list;
    });
  }

  loadMessageForUser() {
    this.loginService.getNotices().subscribe((response: any) => {
      this._notices = [];
      if (response.status == "SUCCESS") {
        // this._notices = response.notices;
        this._notices = response.notices.filter((data: any) => data.isRead === false)
       
        let falseRecords = this._notices.filter((x: any) => x.isRead == false).length;
        console.log('False Records:', falseRecords);
        this.SetNoOfNotices();
      } else {
        console.log("Unable to receive notices : " + response.errorMessage)
      }
    });
  }

  SetNoOfNotices() {
    this._noofNotices = this._notices.length + '';
    this._count = this._notices.filter((x: any) => x.isRead == false).length;
    this.loginService.setNoticeCount(this._count);
    this.loginService.currentNoticeCount.subscribe(list => {
      this._newNoticeCount = list;
    });
  }

  MakeItRead(caseid: any, actionid: any) {
    //casemaster/messageRead?id=1--CaseId--&actionId=--actionID--
   this.loginService.readNotice(caseid, actionid).subscribe((response: any) => {
      if (response.status == "SUCCESS") {
        console.log(response);
        this._notices = response.notices;
        
        //this.noticesCount.emit((this._notices.filter(x => x.isRead == false).length + 1).toString());
        this.loginService.setNoticeCount((this._notices.filter((x: any) => x.isRead == false).length).toString());
        this.loadMessageForUser();
        
      } else if (response.status == "ERROR") {
        alert('Error:' + response.errorMessage);
      }
    });
  }
}
