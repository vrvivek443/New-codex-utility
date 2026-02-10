import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';
import { LoginServiceService } from './services/login-service.service';
import { MasterDataStateService } from './services/master-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mail Merge';
  sidebarCollapsed = false;
  showSidebar = false;
  userString: any;

  constructor(
    private msalService: MsalService,
    private loginService: LoginServiceService,
    private masterData: MasterDataStateService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(filter(status => status === InteractionStatus.None))
      .subscribe(() => {
        this.setActiveAccount();
        this.showSidebar = this.msalService.instance.getAllAccounts().length > 0;
      });
  //   this.loginService.user$.subscribe(user => {
  //   this.userString = user;
  // });
  try {
  
      // Subscribe to the service to check if user data is available
      this.loginService.user$.subscribe((userData: any) => {
        if (userData) {
          try {
            console.log("User data available from app service:", userData);
            this.userString = userData; // Use data from the service
        
            // Check if _user is null and log out if necessary
            if (this.userString == null) {
              console.warn("User data is null. Logging out.");
              // this.logout();
              return; // Exit further execution after logout
            }
        
            // Additional logic if _user is not null
            if (this.userString) {
              console.log("User data is valid, proceeding with rolePageActions.");
              // this._urlConstant.rolePageActions(this._user);
              this.loginService.setMessage(this.userString.userProfiles);
            }
          } catch (error: any) {
            console.error("An error occurred while processing user data:", error.message);
            console.error("Error stack trace:", error.stack);
        
            // Handle error gracefully
            // this.logout();
          }
        }
         else {
          console.log("No data from app service; checking local storage.");
          const userString = localStorage.getItem('user');
          if (!userString) {
            console.warn("No user data in local storage. Logging out.");
            // this.logout();
          } else {
            console.log("User data found in local storage:", userString);
            this.userString = JSON.parse(userString);
          }
        }
  
        // Call rolePageActions if _user is populated
        if (this.userString) {
          // this._urlConstant.rolePageActions(this._user);
          this.loginService.setMessage(this.userString.userProfiles);
        }
      });
      
    } catch (error: any) {
      console.error("An error occurred during initialization:", error.message);
      console.error("Error name:", error.name);
      console.error("Stack trace:", error.stack);
  
      // this.logout();
    }
   this.masterData.loadAll().subscribe();
  }

  private setActiveAccount() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

}
