import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CaseSearchComponent } from './case-search/case-search.component';
import { MemberlogoutComponent } from './memberlogout/memberlogout.component';
import { DataGuard } from './guard/data.guard';

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate: [MsalGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [MsalGuard] },
  { path: 'search', component: CaseSearchComponent, canActivate: [MsalGuard, DataGuard] },
  { path: 'memberlogout', component: MemberlogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
