import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatToolbar } from '@angular/material/toolbar'

import { AVATAR_URL } from '../../../../environments/environment.dv'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faUserAstronaut as userIcon } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule, MatToolbar, FontAwesomeModule],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss'
})
export class FooterComponent {
	full_name = localStorage.getItem('full_name')
	avatar = window.localStorage.getItem('avatar')
	userIcon = userIcon
	URL_AVATAR = AVATAR_URL
}