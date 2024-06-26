import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
	providedIn: 'root'
})

export class SharedService {

	constructor(private matSnackBar: MatSnackBar){}

	showMessage = (message: string, duration: number, horizontalPosition: any, verticalPosition: any, panelClass: string) => {
		this.matSnackBar.open(message, '', {
			duration: duration,
			horizontalPosition: horizontalPosition,
			verticalPosition: verticalPosition,
			panelClass: [panelClass]
		})
	}
}