import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(private authService: MsalService) {}

  logoutUser() {
    console.log('out');
    localStorage.clear();
    const account = this.authService.instance.getActiveAccount();
    this.authService.instance.logoutRedirect({
      account: account,
      postLogoutRedirectUri: window.location.origin + '/memberlogout'
    });
  }
}
