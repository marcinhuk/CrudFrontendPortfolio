import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../../environments/environment.dv';

@Injectable({
	providedIn: 'root'
})
export class OrdersService{

	API_URL = `${API_URL}/orders`

	constructor(private httpClient: HttpClient){}

	list = (): Observable<any> => {
		return this.httpClient.get<any>(this.API_URL).pipe(
			map(obj => obj)
		)
	}

	insert = (): Observable<any> => {
		return this.httpClient.post<any>(this.API_URL, null).pipe(
			map(obj => obj)
		)
	}

	delete = (id: number): Observable<any> => {
		return this.httpClient.delete<any>(`${this.API_URL}/${id}`).pipe(
			map(obj => obj)
		)
	}
}