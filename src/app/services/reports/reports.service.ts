import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { API_URL } from '../../../environments/environment.dv'

@Injectable({
	providedIn: 'root'
})

export class ReportsService {

	private httpClient = inject(HttpClient)

	constructor() {}

	reportMonthYear = (data: any): Observable<any> => {
		return this.httpClient.get<any>(`${API_URL}/reports/${data.relnom}`, {responseType: 'blob' as 'json'}).pipe(
			map(obj => obj),
		)
	}

	orderDetail = (id: number): Observable<any> => {
		return this.httpClient.get<any>(`${API_URL}/reports/order/${id}`, {responseType: 'blob' as 'json'}).pipe(
			map(obj => obj),
		)
	}
}