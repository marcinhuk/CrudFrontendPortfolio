import { AfterViewInit, Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { RouterLink } from '@angular/router'

import { MatTableModule } from '@angular/material/table'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { MatIconButton } from '@angular/material/button'
import { MatTooltip } from '@angular/material/tooltip'

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'
import { ReportsService } from '../../../../services/reports/reports.service'

@Component({
  selector: 'app-table-orders',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatIcon, RouterLink, MatIconButton, MatTooltip]
})
export class TableComponent implements AfterViewInit {

	@Input() dataSource: any
	@Output("list") eEList: EventEmitter<any> = new EventEmitter()
	@Output("update") eEUpdate: EventEmitter<any> = new EventEmitter()
	displayedColumns = ['id', 'date', 'status', 'actions']

	private reportsService = inject(ReportsService)
	private matDialog = inject(MatDialog)

	constructor() {}

	ngAfterViewInit(): void{}

	deleteDialog = (id: number) => {
		const dialogDelete = this.matDialog.open(DeleteDialogComponent, {
			data: {id}
		})

		dialogDelete.afterClosed().subscribe((data) => {
			if (data == true)
				this.eEList.emit()
		})
	}

	openReport = (id: number) => {
		this.reportsService.orderDetail(id).subscribe((data) => {
			const file = new Blob ([data], {type: 'application/pdf'})
			const fileURL = window.URL.createObjectURL(file)
			window.open(fileURL)
		})
	}
}