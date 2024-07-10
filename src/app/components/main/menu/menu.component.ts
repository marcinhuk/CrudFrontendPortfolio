import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

import { MatToolbar } from '@angular/material/toolbar'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialog } from '@angular/material/dialog'
import { DialogExitComponent } from './dialog-exit/dialog-exit.component'
import { DialogMonthYearComponent } from '../../reports/dialog-month-year/dialog-month-year.component'

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [MatToolbar, MatIcon, MatButton, MatMenuModule, RouterLink, CommonModule],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})

export class MenuComponent{

	admin: any = window.localStorage.getItem("admin")

	constructor(private matDialog: MatDialog) {}

	exit = () => {
		this.matDialog.open(DialogExitComponent)
	}

	dialogMonthYear(relnom: String, reltit: String):void{
		const dialogMonthYear = this.matDialog.open(DialogMonthYearComponent, {
			data: {relnom, reltit}
		})
	}
}