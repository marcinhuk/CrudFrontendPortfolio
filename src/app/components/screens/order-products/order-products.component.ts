import { Component, HostListener, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, RouterLink } from '@angular/router'

import { MatButton } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIcon } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'

import { TableComponent } from './table/table.component'
import { OrderProductsService } from '../../../services/order-products/order-products.service'
import { ProductsService } from '../../../services/products/products.service'
import { ScreenHeaderComponent } from '../../shareds/screen-header/screen-header.component'

@Component({
	selector: 'app-order-products',
	standalone: true,
	imports: [MatFormFieldModule, ReactiveFormsModule, MatButton, RouterLink, TableComponent, MatInputModule, MatIcon, MatSelectModule, CommonModule, ScreenHeaderComponent],
	templateUrl: './order-products.component.html',
	styleUrl: './order-products.component.scss'
})

export class OrderProductsComponent {

	dataSource : any = null
	records: number = 0
	articleTableHeight: number = 0
	formGroup : FormGroup
	products: any = null
	@Input()id!:number

	constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private orderProductsService: OrderProductsService, private productsService: ProductsService) {
		this.formGroup = this.formBuilder.group({
			product: ['', Validators.required],
			amount: ['', Validators.required]
		})
	}

	ngOnInit() {
		this.articleTableHeight = window.innerHeight - 321
		this.list()
		this.listProducts()
	}

	@HostListener('window:resize')
	redimensionaTela(): void {
		this.articleTableHeight = window.innerHeight - 321
	}

	listProducts = () => {
		this.productsService.list().subscribe((data) => {
			this.products = data
		})
	}

	list = () => {
		this.orderProductsService.list(this.id).subscribe((data) => {
			this.dataSource = data
			this.records = this.dataSource.length
		})
	}

	cancel = () => {
		this.formGroup.reset()
	}

	insert = () => {
		this.orderProductsService.insert(this.id, this.formGroup.value).subscribe((data) => {
			this.list()
			this.cancel()
		})
	}

}