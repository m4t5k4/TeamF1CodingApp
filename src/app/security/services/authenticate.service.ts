import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EmployeeLogin } from 'src/app/shared/models/employee-login.model';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl

  authenticate(userLogin: EmployeeLogin): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + "employees/authenticate", userLogin);
  }

  register(employee: Employee){
    return this.http.post(this.baseUrl + "employees/", employee);
  }

  isLoggedIn(){
    if (localStorage.getItem("token")){
      return true;
    } 
    else{
      return false;
    }
  }

  logOut(){
    localStorage.clear();
  }
}
