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
    this.masterData.loadAll().subscribe();
    this.msalBroadcastService.inProgress$
      .pipe(filter(status => status === InteractionStatus.None))
      .subscribe(() => {
        this.setActiveAccount();
        this.showSidebar = this.msalService.instance.getAllAccounts().length > 0;
      });
    this.loginService.user$.subscribe(user => {
    this.userString = user;
  });
  }

  private setActiveAccount() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

}
