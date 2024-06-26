import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'

import { LoginService } from './services/login/login.service'

export const authGuard: CanActivateFn = (route, state) => {
	//inject(LoginService).

	return true
}