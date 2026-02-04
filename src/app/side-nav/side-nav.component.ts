import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  _userEmail: string = '';
  _roleName: string = '';

  constructor(private authService: MsalService) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString); // Convert JSON string to object
      this._userEmail = user.name;
      this._roleName = user.role.rolename
    }
  }

  logoutUser() {
    localStorage.clear();
    const account = this.authService.instance.getActiveAccount();
    this.authService.instance.logoutRedirect({
      account: account,
      postLogoutRedirectUri: window.location.origin + '/memberlogout',
    });
  }
}
