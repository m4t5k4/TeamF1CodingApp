import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private user = new User(0,"","","","","");

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(`${environment.baseUrl}employees`);
  }

  putUser(id:number, user:User)
  {
    return this.http.put<User>(`${environment.baseUrl}employees/` + id, user)
  }

  setUser(user: User)
  {
    this.user = user;
    console.log(this.user);
  }

  getUser() {
    return this.user;
  }

  deleteUser(id: number)
  {
    return this.http.delete<User>(`${environment.baseUrl}employees/` + id)
  }
}
