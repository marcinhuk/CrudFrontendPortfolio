import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core'
import { RouterLink } from '@angular/router'

import { MatTableModule } from '@angular/material/table'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { MatTooltip } from '@angular/material/tooltip'

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
	selector: 'app-table-order-products',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	standalone: true,
	imports: [MatTableModule, MatIcon, RouterLink, MatTooltip]
})
export class TableComponent implements AfterViewInit {

	@Input() dataSource: any
	@Output("list") eEList: EventEmitter<any> = new EventEmitter()
	@Output("update") eEUpdate: EventEmitter<any> = new EventEmitter()
	displayedColumns = ['index', 'name', 'amount', 'actions']

	constructor(private matDialog: MatDialog) {}

	ngAfterViewInit(): void{}

	productsDialog = (id: number) => {

	}

	deleteDialog = (id: number) => {
		const dialogDelete = this.matDialog.open(DeleteDialogComponent, {
			data: {id}
		})

		dialogDelete.afterClosed().subscribe((data) => {
			if (data == true)
				this.eEList.emit()
		})
	}
}