import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIcon } from '@angular/material/icon'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faAngular as faLogo } from '@fortawesome/free-brands-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'app-screen-header',
	standalone: true,
	imports: [MatIcon, FontAwesomeModule, MatTooltipModule],
	templateUrl: './screen-header.component.html',
	styleUrl: './screen-header.component.scss'
})

export class ScreenHeaderComponent {
	iconClose = faClose
	iconLogo = faLogo

	@Input() screenTitle: string = ''
	@Input() closeRoute: string = ''

	constructor(private router: Router) {}

	close = () => {
		this.router.navigate([this.closeRoute])
	}
}