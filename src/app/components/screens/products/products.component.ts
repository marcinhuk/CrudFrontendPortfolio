import { Component, HostListener } from '@angular/core'
import { RouterLink } from '@angular/router'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'

import { MatButton } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { TableComponent } from './table/table.component'
import { MatIcon } from '@angular/material/icon'

import { ProductsService } from '../../../services/products/products.service'
import { ScreenHeaderComponent } from '../../shareds/screen-header/screen-header.component'

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatButton, RouterLink, TableComponent, MatIcon, ReactiveFormsModule, ScreenHeaderComponent],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss'
})

export class ProductsComponent {

	dataSource : Array<any> = []
	records: number = 0
	articleTableHeight: number = 0
	formGroup : FormGroup
	btnAddSave: string = 'Add'

	constructor(private productsService: ProductsService, private formBuilder: FormBuilder) {
		this.formGroup = this.formBuilder.group({
			id: [''],
			name: ['', Validators.required],
			price: ['', Validators.required]
		})
	}

	ngOnInit(): void {
		this.articleTableHeight = window.innerHeight - 321

		this.list()
	}

	@HostListener('window:resize' )
		redimensionaTela(): void {
			this.articleTableHeight = window.innerHeight - 321
		}

	list = () => {
		this.productsService.list().subscribe((data) => {
			this.dataSource = data
			this.records = this.dataSource.length
		})
	}

	insert = () => {
		if (this.btnAddSave == 'Add'){
			this.productsService.insert(this.formGroup.value).subscribe((data) => {
				this.dataSource.push(data)
				this.dataSource = [...this.dataSource]
				this.records = this.dataSource.length
				this.cancel()
			})
		} else {
			this.productsService.update(this.formGroup.value).subscribe(() => {
				const objIndex = this.dataSource.findIndex(obj => obj.id == this.formGroup.controls['id'].value)
				this.dataSource[objIndex].name = this.formGroup.controls['name'].value
				this.dataSource[objIndex].price = this.formGroup.controls['price'].value
				this.cancel()
			})
		}
	}

	update = (updateParams: any) => {
		this.btnAddSave = 'Save'
		this.formGroup.controls['id'].setValue(updateParams.id)
		this.formGroup.controls['name'].setValue(updateParams.name)
		this.formGroup.controls['price'].setValue(updateParams.price)
	}

	cancel = () => {
		this.btnAddSave = 'Add'
		this.formGroup.reset()
	}

	delete = (id: number) => {
		const objIndex = this.dataSource.findIndex(obj => obj.id == id)
		this.dataSource.splice(objIndex, 1)
		this.dataSource = [...this.dataSource]
		this.records = this.dataSource.length
	}
}