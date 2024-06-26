import { Component, Inject } from '@angular/core'

import { MatButton } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'

import { OrdersService } from '../../../../services/orders/orders.service'
import { SharedService } from '../../../../services/shared/shared.service'

@Component({
	selector: 'app-delete-dialog-orders',
	standalone: true,
	imports: [MatButton, MatDialogModule],
	templateUrl: './delete-dialog.component.html',
	styleUrl: './delete-dialog.component.scss'
})

export class DeleteDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ordersService: OrdersService, private sharedService: SharedService) {}

	deleteRecord = () => {
		this.ordersService.delete(this.data.id).subscribe((data) => {
			this.sharedService.showMessage('Record deleted', 3000, 'center', 'botton', 'success-snackbar')
		})
	}
}