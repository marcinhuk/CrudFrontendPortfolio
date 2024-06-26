import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'

import { API_URL } from '../../../environments/environment.dv';

@Injectable({
	providedIn: 'root'
})
export class OrderProductsService {

	API_URL = `${API_URL}/orderproducts`

	constructor(private httpClient: HttpClient) {}

	list = (id: number): Observable<any> => {
		return this.httpClient.get<any>(`${this.API_URL}/${id}`).pipe(
			map(obj => obj)
		)
	}

	insert = (id: number, params: any): Observable<any> => {
		const httpParams = new HttpParams()
		.append('order_id', id)
		.append('product_id', params.product)
		.append('amount', params.amount)

		return this.httpClient.post<any>(this.API_URL, httpParams).pipe(
			map(obj => obj)
		)
	}

	delete = (id: number): Observable<any> => {
		return this.httpClient.delete<any>(`${this.API_URL}/${id}`).pipe(
			map(obj => obj)
		)
	}
}