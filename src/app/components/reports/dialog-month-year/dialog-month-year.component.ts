import { Component, Inject, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ReportsService } from '../../../services/reports/reports.service';

@Component({
	selector: 'app-dialog-month-year',
	standalone: true,
	imports: [MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule ,MatButtonModule],
	templateUrl: './dialog-month-year.component.html',
	styleUrl: './dialog-month-year.component.scss'
})

export class DialogMonthYearComponent {

	private reportsService = inject(ReportsService)
	meuFormGroup: FormGroup

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder){
		this.meuFormGroup = this.formBuilder.group({
			relnom: [data.relnom, Validators.required]
		})
	}

	abreRelatorio = async () => {
		this.reportsService.reportMonthYear(this.meuFormGroup.value).subscribe(data => {
			const file = new Blob ([data], {type: 'application/pdf'})
			const fileURL = window.URL.createObjectURL(file)
			window.open(fileURL)
		})
	}

}