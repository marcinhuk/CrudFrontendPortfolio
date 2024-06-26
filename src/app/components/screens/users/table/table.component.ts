import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { MatTableModule } from '@angular/material/table'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatTooltip } from '@angular/material/tooltip'

import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome'
import { faCamera as avatarIcon } from '@fortawesome/free-solid-svg-icons'

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'
import { UsersService } from '../../../../services/users/users.service'
import { SharedService } from '../../../../services/shared/shared.service'

@Component({
  selector: 'app-table-users',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatSlideToggle, MatTooltip, FontAwesomeModule]
})
export class TableComponent implements AfterViewInit {

	@Input() dataSource: any
	@Output("delete") eEDelete: EventEmitter<any> = new EventEmitter()
	@Output("update") eEUpdate: EventEmitter<any> = new EventEmitter()
	displayedColumns = ['index', 'full_name', 'email', 'active', 'admin', 'actions']
	checked = false
	avatarIcon = avatarIcon

	constructor(private matDialog: MatDialog, private usersService: UsersService, private sharedService: SharedService) {}

	ngAfterViewInit(): void{}

	update = (id: number, full_name: string, email: string, password: string, avatar: string) => {
		this.eEUpdate.emit({id, full_name, email, password, avatar})
	}

	patchActive = (id: number, active: number) => {
		active = active == 0 ? 1 : 0
		this.usersService.patchActive(id, active).subscribe((data) => {
			this.sharedService.showMessage('Active user changed', 3000, 'center', 'botton', 'success-snackbar')
		})
	}

	patchAdmin = (id: number, admin: number) => {
		admin = admin == 0 ? 1 : 0
		this.usersService.patchAdmin(id, admin).subscribe((data) => {
			this.sharedService.showMessage('Admin user changed', 3000, 'center', 'botton', 'success-snackbar')
		})
	}

	deleteDialog = (id: number) => {
		const dialogDelete = this.matDialog.open(DeleteDialogComponent, {data: { id }})

		dialogDelete.afterClosed().subscribe((data) => {
			if (data == true){
				this.eEDelete.emit(id)
			}
		})
	}
}