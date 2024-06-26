import { Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'

import { AVATAR_URL } from '../../../../../environments/environment.dv'

import { ScreenHeaderComponent } from '../../../shareds/screen-header/screen-header.component'
import { UsersService } from '../../../../services/users/users.service'
import { DialogHeaderComponent } from '../../../shareds/dialog-header/dialog-header.component'

@Component({
	selector: 'app-avatar-upload-dialog',
	standalone: true,
	imports: [CommonModule, ScreenHeaderComponent, MatIcon, MatButtonModule, MatDialogModule, DialogHeaderComponent, MatTooltip],
	templateUrl: './avatar-upload-dialog.component.html',
	styleUrl: './avatar-upload-dialog.component.scss'
})

export class AvatarUploadDialogComponent {

	file: Array<File> = []
	fileName: string = ''
	arquivosParaUpload: number = 0
	URL_AVATAR = AVATAR_URL
	avatar: string = this.data.avatar

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService){}

	onFileSelected = (event: any): void => {
		this.file = event.target.files
		this.fileName = this.file[0].name
	}

	send = (): void => {
		const formData = new FormData()
			formData.append("id", this.data.id),
			formData.append("file", this.file[0], this.file[0].name)

		this.userService.avatar(formData).subscribe(data => {
		 	this.fileName = ''
			this.avatar = data.avatar
		 	// this.fileInput.nativeElement.value = ''
		})
	}

}