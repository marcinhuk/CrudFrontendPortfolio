import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, tap } from 'rxjs'

import { LoginService } from '../services/login/login.service'
import { SharedService } from '../services/shared/shared.service'

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

	constructor(private loginService: LoginService, private sharedService: SharedService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token') || ''

		const authReq = req.clone({
			headers: req.headers.set('Authorization', token)
		});

		return next.handle(authReq).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse) {
						if (event.body?.token){
							localStorage.setItem('token', event.body.token)
							//this.loginService.messageSource.next('start')
						}
					}
				},
				error => {
					if (error instanceof HttpErrorResponse){

						switch(error.error?.type){
							case "MYSQL":
								this.sharedService.showMessage(error.error.message, 3000, 'center', 'botton', 'error-snackbar')
							break

							case "VALIDATION":
								let message: string = ''

								error.error.messages.errors.forEach((element: any, i: number) => {
									message += element.msg

									if (i < (error.error.messages.errors.length - 1))
										message += ', '
								})

								this.sharedService.showMessage(message, 3000, 'center', 'botton', 'error-snackbar')
							break

							case "TOKENVERIFY":
							case "NOTOKEN":
								this.sharedService.showMessage(error.error.message, 3000, 'center', 'botton', 'error-snackbar')
								window.localStorage.clear()
								this.router.navigate(['/'])
							break

							case "NOTANADMIN":
								this.sharedService.showMessage(error.error.message, 3000, 'center', 'botton', 'error-snackbar')
								this.router.navigate(['/main'])
							break
						}

						if (error.status == 0)
							this.sharedService.showMessage(`Backend communication error: ${error.name}`, 3000, 'center', 'botton', 'error-snackbar')
					}
				}
			)
		)
    }
}