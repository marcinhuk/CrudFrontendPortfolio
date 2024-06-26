import { ApplicationConfig } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'

import { AuthorizationInterceptor } from './interceptors/token.interceptor'


export const appConfig: ApplicationConfig = {
  providers: [
		provideRouter(routes, withComponentInputBinding()),
		provideClientHydration(),
		provideAnimationsAsync(),
		provideHttpClient(withFetch(), withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthorizationInterceptor,
			multi: true
		}, provideAnimationsAsync(), provideAnimationsAsync(),
	]
};
