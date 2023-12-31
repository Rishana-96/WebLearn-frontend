import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Tutors } from '../interfaces/interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};
@Injectable()
export class TutorService {
  constructor(private http: HttpClient) {}
  apiUrl: string = environment.Tutor_API_Key;

  tutorSignup(tutor: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, tutor);
  }
  verifyTutor(id: Tutors): Observable<any> {
    return this.http.post(`${this.apiUrl}/verifyTutor?id=` + id, httpOptions);
  }
  tutorLogin(tutor: Tutors): Observable<any> {
    return this.http.post(`${this.apiUrl}/tutor-login`, tutor, httpOptions);
  }
  tutorDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tutorDetails`, {
      withCredentials: true,
    });
  }
  saveTutor(tutor: Tutors): Observable<any> {
    return this.http.post(`${this.apiUrl}/tutorSave`, tutor, httpOptions);
  }
}
