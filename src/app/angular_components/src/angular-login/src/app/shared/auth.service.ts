import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser({api_url, username, password, rememberMe}: any): Observable<any> {
    console.log(`request sent at: ${api_url}`)
    return this.http.post(api_url, {
      username: username,
      password: password,
      expire: rememberMe
    })
  }
}
