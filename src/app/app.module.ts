import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberlogoutComponent } from './memberlogout/memberlogout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Required for MSAL
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { LoginComponent } from './login/login.component';
import { CaseSearchComponent } from './case-search/case-search.component';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
      clientId: "bd25ac3c-a023-4118-a45c-1ca7302f97fe",
      // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
      authority: "https://login.microsoftonline.com/4414c298-bd53-489e-a563-86fad2336547",
      // Must be the same redirectUri as what was provided in your app registration.
      // redirectUri: "https://localhost:4200/dashboard",
      redirectUri: "http://localhost:4200/dashboard",
      postLogoutRedirectUri: "http://localhost:4200/memberlogout",
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      // storeAuthStateInCookie: isIE
    }
  });
}

// MSAL Interceptor is required to request access tokens in order to access the protected resource (Graph)
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

// MSAL Guard is required to protect routes and require authentication before accessing protected routes
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    DashboardComponent,
    MemberlogoutComponent,
    LoginComponent,
    CaseSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
