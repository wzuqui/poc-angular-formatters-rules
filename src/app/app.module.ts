/* eslint-disable sort-imports */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';

import { DevExtremeModule } from 'devextreme-angular';
import DxConfig from 'devextreme/core/config';
import { loadMessages, locale } from 'devextreme/localization';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { xMensagens } from './devextreme-pt';
import { MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory } from './msal-config';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MsalModule, DevExtremeModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
})
export class AppModule {
  constructor() {
    loadMessages(xMensagens);
    locale('pt-BR');
    DxConfig({
      forceIsoDateParsing: false,
    });
  }
}
