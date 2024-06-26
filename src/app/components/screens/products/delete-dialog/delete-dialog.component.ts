import { Component, Inject } from '@angular/core'

import { MatButton } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'

import { ProductsService } from '../../../../services/products/products.service'
import { SharedService } from '../../../../services/shared/shared.service'
import { DialogRef } from '@angular/cdk/dialog'

@Component({
	selector: 'app-delete-dialog-products',
	standalone: true,
	imports: [MatButton, MatDialogModule],
	templateUrl: './delete-dialog.component.html',
	styleUrl: './delete-dialog.component.scss'
})

export class DeleteDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productsService: ProductsService, private sharedService: SharedService, private dialogRef: DialogRef) {}

	deleteRecord = () => {
		this.productsService.delete(this.data.id).subscribe({
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