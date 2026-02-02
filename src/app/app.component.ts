import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'New-codex-utility';
  sidebarCollapsed = false;
  showSidebar = false;

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(filter(status => status === InteractionStatus.None))
      .subscribe(() => {
        this.setActiveAccount();
        this.showSidebar = this.msalService.instance.getAllAccounts().length > 0;
      });
  }

  private setActiveAccount() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

}
