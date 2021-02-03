import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.baseUrl + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roleAs: string;

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login' , {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password      
    }, httpOptions);
  }

  edit(user): Observable<any> {
    return this.http.put(AUTH_API + 'edit', {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password      
    }, httpOptions);
  }

  isLoggedIn() {
    if (sessionStorage.getItem("auth-token")) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedInAsAdmin() {
    if (sessionStorage.getItem("auth-user").includes("Admin")) {
      return true;
    } else {
      return false;
    }
  }

  getRole() {
    this.roleAs = JSON.parse(sessionStorage.getItem("auth-user")).roles;
    return this.roleAs;
  }

}
