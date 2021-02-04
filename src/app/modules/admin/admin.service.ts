import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/security/services/user.service';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private _userService: UserService) { }

  private role = new Role(0,"");

  private roles = this.getRoles();

  private user = new User(0,"","","","",this.roles[0]);

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(`${environment.baseUrl}employees`);
  }

  putUser(user:User)
  {
    return this.http.put<User>(`${environment.baseUrl}employees`, user)
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

  getRoles(): Observable<any> {
    return this.http.get<Role[]>(`${environment.baseUrl}roles`);
  }

  getRole()
  {
    return this.role;
  }

  setRole(role : Role){
    this.role = role;
    console.log(this.role);
  }

  setRfid(id : number){
    return this.http.post<number>(`${environment.baseUrl}rfid/` + id,null)
  }
}
