import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    Authorization: `Bearer ${''}`,
  }),
};

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {}

  apiUrl: string = environment.User_API_Key;

  userRegister(user: Users): Observable<any> {
    console.log(this.apiUrl);

    return this._http.post(`${this.apiUrl}/register`, user, httpOptions);
  }

  userLogin(user: Users): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, user, httpOptions);
  }

  verifyUser(id: Users): Observable<any> {
    return this._http.post(`${this.apiUrl}/verifyUser?id=` + id, httpOptions);
  }

  userDetails(): Observable<any> {
    return this._http.get(`${this.apiUrl}/userDetails`, {
      withCredentials: true,
    });
  }
  saveUser(user: Users): Observable<any> {
    return this._http.post(`${this.apiUrl}/userSave`, user, httpOptions);
  }
}
