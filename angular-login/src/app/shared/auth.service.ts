import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser({username, password, rememberMe}: any): Observable<any> {
    // return this.http.post(environment.apiUrl, {
    //   username: username,
    //   password: password
    //   expire: rememberMe
    // })
    let tempSubj = new BehaviorSubject({
      success: true,
      token: ***REMOVED***
    });
    return tempSubj
  }
}
