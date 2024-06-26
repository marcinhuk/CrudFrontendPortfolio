import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core'
import { RouterLink } from '@angular/router'

import { MatTableModule } from '@angular/material/table'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { MatIconButton } from '@angular/material/button'
import { MatTooltip } from '@angular/material/tooltip'

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

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

	constructor(private matDialog: MatDialog) {}

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
}