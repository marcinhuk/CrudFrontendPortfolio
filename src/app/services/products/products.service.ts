import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../../environments/environment.dv';

@Injectable({
	providedIn: 'root'
})

export class ProductsService {

	API_URL = `${API_URL}/products`

	constructor(private httpClient: HttpClient){}

	list = ():Observable<any> => {
		return this.httpClient.get<any>(this.API_URL).pipe(
			map(obj => obj)
		)
	}

	insert = (insertParams: any):Observable<any> => {
		const params = new HttpParams()
			.append('name', insertParams.name)
			.append('price', insertParams.price)

		return this.httpClient.post<any>(this.API_URL, params).pipe(
			map(obj => obj)
		)
	}

	update = (updateParams: any):Observable<any> => {
		const params = new HttpParams()
			.append('name', updateParams.name)
			.append('price', updateParams.price)

		return this.httpClient.put<any>(`${this.API_URL}/${updateParams.id}`, params).pipe(
			map(obj => obj)
		)
	}

	delete = (id: number):Observable<any> => {
		return this.httpClient.delete<any>(`${this.API_URL}/${id}`).pipe(
			map(obj => obj)
		)
	}
}
