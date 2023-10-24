import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers : new HttpHeaders({
    'content-Type' : 'application/json',
    'Authorization':`Bearer ${''}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  apiUrl:string = environment.API_Key;

  adminLogin(form:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,form,httpOptions)
  }

  loadUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}/userList`,{withCredentials:true})
  }

  loadTutors():Observable<any>{
    return this.http.get(`${this.apiUrl}/tutorList`,{withCredentials:true})
  }
  blockUser(id:string):Observable<any>{
    const requestBody = {id:id};
    return this.http.patch(`${this.apiUrl}/blockUser`,requestBody,httpOptions)

  }
  unblockUser(id:string):Observable<any>{
    const requestBody = { id:id};
    return this.http.patch(`${this.apiUrl}/unblockUser`,requestBody,httpOptions)
  }
  approveTutor(tutorId:string,status:string):Observable<any>{
    const requestBody = {id:tutorId,status:status}
    return this.http.put<any>(`${this.apiUrl}/approve-tutor`,requestBody,httpOptions)
  }
  rejectTutor(tutorId:string,status:string):Observable<any>{
    const requestBody = {id:tutorId,status:status}
    return this.http.put<any>(`${this.apiUrl}/reject-tutor`,requestBody,httpOptions)
  }
}
