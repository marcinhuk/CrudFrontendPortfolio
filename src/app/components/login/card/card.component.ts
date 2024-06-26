import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { animate, state, style, transition, trigger } from '@angular/animations'

import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faUserAstronaut as avatarDefault } from '@fortawesome/free-solid-svg-icons'

import { AVATAR_URL, USULOG, USUSEN } from '../../../../environments/environment.dv'

import { LoginService } from '../../../services/login/login.service'
import { SharedService } from '../../../services/shared/shared.service'

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [
		MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, CommonModule,
		MatProgressSpinner, FontAwesomeModule
	],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	animations: [
		trigger('animationAvatar', [
			state('hide', style({
				opacity: 0,
				height: 0,
				width: 0,
			})),
			state('show', style({
				opacity: 1,
				height: 114,
				width: 114,
			})),
			transition('hide => show', animate('800ms ease-in')),
			transition('show => hide', animate('800ms ease-out'))
		])
	]
})

export class CardComponent {

	formGroup: FormGroup
	showPassword = true
	waiting = false
	avatarDefault = avatarDefault
	avatar = null
	URL_AVATAR = AVATAR_URL
	stateAvatar = 'hide'

	constructor(private sharedSerice: SharedService, private formBuilder: FormBuilder, private loginService: LoginService, private router: Router){
		this.formGroup = this.formBuilder.group({
			email: [USULOG, Validators.required],
			password: [USUSEN, Validators.required]
		})
	}

	login = () => {
		if (this.formGroup.valid){
			this.waiting = true
			this.loginService.login(this.formGroup.value).subscribe({
				next: (data) => {
					if (data){
						if (data.token){
							localStorage.setItem('token', data.token)
							localStorage.setItem('full_name', data.full_name)
							localStorage.setItem('admin', data.admin)
							localStorage.setItem('avatar', data.avatar)
							this.sharedSerice.showMessage('Login successful', 1500, 'center', 'botton', 'success-snackbar')

							setTimeout(() => {
								this.router.navigate(['/main'])
							}, 1000);
						}
					} else {
						this.sharedSerice.showMessage('Invalid credentials', 3000, 'center', 'botton', 'error-snackbar')
					}

					this.waiting = false
				},
				error: () =>  {
					this.waiting = false
				}
			})
		}else{
			this.sharedSerice.showMessage('Email and password must be filled', 3000, 'center', 'botton', 'error-snackbar')
		}
	}

	change = () => {
		if (this.formGroup.controls['email'].value.length >= 5){
			this.loginService.getAvatar(this.formGroup.controls['email'].value).subscribe((data) => {
				if (data?.avatar){
					this.avatar = data.avatar
					this.stateAvatar = 'show'
				} else {
					this.stateAvatar = 'hide'
				}
			})
		}
	}
}