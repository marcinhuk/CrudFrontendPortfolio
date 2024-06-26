import { Component, HostListener } from '@angular/core'
import { RouterLink } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIcon } from '@angular/material/icon'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

import { ScreenHeaderComponent } from '../../shareds/screen-header/screen-header.component'
import { TableComponent } from './table/table.component'
import { OrdersService } from '../../../services/orders/orders.service'

@Component({
	selector: 'app-orders',
	standalone: true,
	imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, TableComponent, MatIcon, FontAwesomeModule, ScreenHeaderComponent],
	templateUrl: './orders.component.html',
	styleUrl: './orders.component.scss'
})

export class OrdersComponent {

	dataSource : any = null
	records: number = 0
	articleTableHeight: number = 0
	faInstagram = faInstagram

	constructor(private ordersService: OrdersService) {}

	ngOnInit(): void {
		this.articleTableHeight = window.innerHeight - 263
		this.list()
	}

	@HostListener('window:resize' )
		redimensionaTela(): void {
			this.articleTableHeight = window.innerHeight - 263
		}

	list = () => {
		this.ordersService.list().subscribe((data) => {
			this.dataSource = data
			this.records = this.dataSource.length
		})
	}

	insert = () => {
		this.ordersService.insert().subscribe((data) => {
			this.list()
		})
	}
}