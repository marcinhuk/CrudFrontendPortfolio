import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'

import { API_URL } from '../../../environments/environment.dv';

@Injectable({
	providedIn: 'root'
})

export class LoginService {

	API_URL =  `${API_URL}/login`

	constructor(private httpClient: HttpClient){}

	getAvatar = (email: string): Observable<any> => {
		return this.httpClient.get<any>(`${this.API_URL}/avatar/${email}`).pipe(
			map(obj => obj)
		)
	}

	login = (paramLogin: any): Observable<any> => {
		const params = new HttpParams()
			.append('email', paramLogin.email)
			.append('password', paramLogin.password)

		return this.httpClient.post<any>(`${this.API_URL}/signin`, params).pipe(
			map(obj => obj)
		)
	}
}