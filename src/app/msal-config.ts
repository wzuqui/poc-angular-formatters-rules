import type { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import type { IPublicClientApplication } from '@azure/msal-browser';
import { BrowserCacheLocation, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'df4c545f-1cd6-43d6-857b-2598c0dbaeca',
      authority: 'https://login.microsoftonline.com/organizations',
      redirectUri: 'http://localhost:4200/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: true,
    },
    system: {
      loggerOptions: {
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const xProtectedResourceMap = new Map<string, Array<string>>();
  xProtectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['User.Read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: xProtectedResourceMap,
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['User.Read'],
    },
  };
}
