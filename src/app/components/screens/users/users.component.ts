import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { MatButton } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { TableComponent } from './table/table.component'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'

import { AVATAR_URL } from '../../../../environments/environment.dv'

import { UsersService } from '../../../services/users/users.service'
import { SharedService } from '../../../services/shared/shared.service'
import { ScreenHeaderComponent } from '../../shareds/screen-header/screen-header.component'
import { AvatarUploadDialogComponent } from './avatar-upload-dialog/avatar-upload-dialog.component'

@Component({
	selector: 'app-users',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatButton, TableComponent, MatIcon, ReactiveFormsModule, ScreenHeaderComponent],
	templateUrl: './users.component.html',
	styleUrl: './users.component.scss'
})

export class UsersComponent {

	dataSource : Array<any> = []
	records: number = 0
	articleTableHeight: number = 0
	formGroup: FormGroup
	btnAddSave: string = 'Add'
	URL_AVATAR = AVATAR_URL
	avatar: string = ''

	constructor(private usersService: UsersService, private formBuilder: FormBuilder, private sharedService: SharedService, private router: Router, private matDialog: MatDialog) {
		this.formGroup = formBuilder.group({
			id: [''],
			full_name: ['Carlos Bolsonaro', [Validators.required, Validators.minLength(5), Validators.maxLength(150)] ],
			email: ['carluxo@bolsonaro.com.br', [Validators.required, Validators.minLength(5), Validators.maxLength(150)] ],
			password: ['123456789', [Validators.required, Validators.minLength(8), Validators.maxLength(50)] ],
			confirmPassword: ['123456789', [Validators.required, Validators.minLength(8), Validators.maxLength(50)] ],
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
		this.usersService.list().subscribe((data) => {
			this.dataSource = data
			this.records = this.dataSource.length
		})
	}

	insert = () => {
		if (this.formGroup.controls['password'].value && this.formGroup.controls['confirmPassword'].value){
			if (this.formGroup.controls['password'].value === this.formGroup.controls['confirmPassword'].value) {
				if (this.btnAddSave == 'Add'){
					this.usersService.insert(this.formGroup.value).subscribe((data) => {
						this.dataSource.push(data)
						this.dataSource = [...this.dataSource]
						this.records = this.dataSource.length
						this.cancel()
					})
				} else {
					this.usersService.update(this.formGroup.value).subscribe((data) => {
						const objIndex = this.dataSource.findIndex(obj => obj.id == this.formGroup.controls['id'].value)
						this.dataSource[objIndex].full_name = this.formGroup.controls['full_name'].value
						this.dataSource[objIndex].email = this.formGroup.controls['email'].value
						this.cancel()
					})
				}
			} else {
				this.sharedService.showMessage('Password does not match', 3000, 'center', 'botton', 'error-snackbar')
			}
		} else {
			this.sharedService.showMessage('Password and confirm password must be filled', 3000, 'center', 'botton', 'error-snackbar')
		}
	}

	update = (params: any) => {
		this.btnAddSave = 'Save'
		this.formGroup.controls['id'].setValue(params.id)
		this.formGroup.controls['full_name'].setValue(params.full_name)
		this.formGroup.controls['email'].setValue(params.email)
		this.avatar = params.avatar
	}

	cancel = () => {
		this.btnAddSave = 'Add'
		this.avatar = '' // ===> erro no console sem maiores problemas
		this.formGroup.reset()
	}

	avatarConfig = () => {
		const id = this.formGroup.controls['id'].value

		if (id){
			const dialog = this.matDialog.open(AvatarUploadDialogComponent, {disableClose: true, panelClass: "teste", data: { id, avatar: this.avatar }})

			dialog.afterClosed().subscribe((data) => {
				if (data){
					this.avatar = data
					const objIndex = this.dataSource.findIndex(obj => obj.id == id)
					this.dataSource[objIndex].avatar = this.avatar
				}
			})
		} else {
			this.sharedService.showMessage('No user selected', 3000, 'center', 'botton', 'error-snackbar')
		}
	}

	delete = (id: number) => {
		const objIndex = this.dataSource.findIndex(obj => obj.id == id)
		this.dataSource.splice(objIndex, 1)
		this.dataSource = [...this.dataSource]
		this.records = this.dataSource.length
	}
}