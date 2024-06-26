import { Component, Input } from '@angular/core'

import { MatIcon } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faAngular as faLogo } from '@fortawesome/free-brands-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'app-dialog-header',
	standalone: true,
	imports: [MatIcon, FontAwesomeModule, MatTooltipModule, MatDialogModule],
	templateUrl: './dialog-header.component.html',
	styleUrl: './dialog-header.component.scss'
})

export class DialogHeaderComponent {
	iconClose = faClose
	iconLogo = faLogo

	@Input() dialogTitle: string = ''
	@Input() closeData: string = ''

	constructor() {}
}