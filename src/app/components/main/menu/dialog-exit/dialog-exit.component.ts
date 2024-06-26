import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { MatDialogModule } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

@Component({
	selector: 'app-dialog-exit',
	standalone: true,
	imports: [MatDialogModule, MatButton],
	templateUrl: './dialog-exit.component.html',
	styleUrl: './dialog-exit.component.scss'
})

export class DialogExitComponent {

	constructor(private router: Router) {}

	exit = () => {
		localStorage.clear()
		this.router.navigate(['/'])
	}
}