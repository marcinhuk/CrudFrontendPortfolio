import { Component, Inject } from '@angular/core'

import { MatButton } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog'

import { UsersService } from '../../../../services/users/users.service'
import { SharedService } from '../../../../services/shared/shared.service'

@Component({
	selector: 'app-delete-dialog-users',
	standalone: true,
	imports: [MatButton, MatDialogModule, MatDialogClose],
	templateUrl: './delete-dialog.component.html',
	styleUrl: './delete-dialog.component.scss'
})

export class DeleteDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService, private sharedService: SharedService, public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

	deleteRecord = () => {

		this.usersService.delete(this.data.id).subscribe({
			next: () => {
				this.dialogRef.close(true)
				this.sharedService.showMessage('Record deleted', 3000, 'center', 'botton', 'success-snackbar')
			},
			error: () => {
				this.dialogRef.close(false)
			}
		})
	}
}