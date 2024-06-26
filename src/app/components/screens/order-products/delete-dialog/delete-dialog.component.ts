import { Component, Inject } from '@angular/core'

import { MatButton } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'

import { SharedService } from '../../../../services/shared/shared.service'
import { OrderProductsService } from '../../../../services/order-products/order-products.service'

@Component({
	selector: 'app-delete-dialog-order-products',
	standalone: true,
	imports: [MatButton, MatDialogModule],
	templateUrl: './delete-dialog.component.html',
	styleUrl: './delete-dialog.component.scss'
})

export class DeleteDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderProductsService: OrderProductsService, private sharedService: SharedService) {}

	deleteRecord = () => {
		this.orderProductsService.delete(this.data.id).subscribe((data) => {
			this.sharedService.showMessage('Record deleted', 3000, 'center', 'botton', 'success-snackbar')
		})
	}
}