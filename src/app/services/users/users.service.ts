import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../../environments/environment.dv';

@Injectable({
	providedIn: 'root'
})
export class UsersService{

	API_URL = `${API_URL}/users`

	constructor(private httpClient: HttpClient){}

	list = ():Observable<any> => {
		return this.httpClient.get<any>(this.API_URL).pipe(
			map(obj => obj)
		)
	}

	insert = (params: any):Observable<any> => {
		const httpParams = new HttpParams()
			.append('email', params.email)
			.append('password', params.password)
			.append('full_name', params.full_name)

		return this.httpClient.post<any>(this.API_URL, httpParams).pipe(
			map(obj => obj)
		)
	}

	avatar = (params: any):Observable<any> => {
		return this.httpClient.post<any>(`${this.API_URL}/avatar`, params).pipe(
			map(obj => obj)
		)
	}

	update = (params: any):Observable<any> => {
		const httpParams = new HttpParams()
			.append('email', params.email)
			.append('password', params.password)
			.append('full_name', params.full_name)

		return this.httpClient.put<any>(`${this.API_URL}/${params.id}`, httpParams).pipe(
			map(obj => obj)
		)
	}

	patchActive = (id: number, active: number):Observable<any> => {
		const httpParams = new HttpParams()
			.append('active', active)

		return this.httpClient.patch<any>(`${this.API_URL}/active/${id}`, httpParams).pipe(
			map(obj => obj)
		)
	}

	patchAdmin = (id: number, admin: number):Observable<any> => {
		const httpParams = new HttpParams()
			.append('admin', admin)

		return this.httpClient.patch<any>(`${this.API_URL}/admin/${id}`, httpParams).pipe(
			map(obj => obj)
		)
	}

	delete = (id: number):Observable<any> => {
		return this.httpClient.delete<any>(`${this.API_URL}/${id}`).pipe(
			map(obj => obj)
		)
	}
}