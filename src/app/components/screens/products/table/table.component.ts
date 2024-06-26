import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { MatTableModule } from '@angular/material/table'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { MatTooltip } from '@angular/material/tooltip'

import { ProductsService } from '../../../../services/products/products.service'
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'app-table-products',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatTooltip]
})
export class TableComponent implements AfterViewInit {

	constructor(private productsService: ProductsService, private matDialog: MatDialog){}

	@Input() dataSource: any
	@Output("delete") eEDelete: EventEmitter<any> = new EventEmitter()
	@Output("update") eEUpdate: EventEmitter<any> = new EventEmitter()
	displayedColumns = ['index', 'name', 'price', 'actions']

	ngAfterViewInit(): void{}

	update = (id: number, name: string, price: number) => {
		this.eEUpdate.emit({id, name, price})
	}

	deleteDialog = (id: number) => {
		const dialogDelete = this.matDialog.open(DeleteDialogComponent, {
			data:{ id }
		})

		dialogDelete.afterClosed().subscribe((data) => {
			if (data == true){
				this.eEDelete.emit(id)
			}
		})
	}
}