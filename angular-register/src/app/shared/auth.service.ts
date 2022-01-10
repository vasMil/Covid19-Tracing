import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser({api_url, username, password, email}: any): Observable<any> {
    return this.http.post(api_url, {
      username: username,
      password: password,
      email: email
    })
  }
}