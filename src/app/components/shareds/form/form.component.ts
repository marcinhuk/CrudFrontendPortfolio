import { Component, Input } from '@angular/core'

import { MatButton } from '@angular/material/button'

@Component({
	selector: 'app-form',
	standalone: true,
	imports: [MatButton],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})

export class FormComponent{

	@Input() title: string = ''

}