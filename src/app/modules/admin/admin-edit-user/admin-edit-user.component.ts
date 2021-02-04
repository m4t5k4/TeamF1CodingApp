import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from '../admin.service';
import { Role } from 'src/app/shared/models/role.model';
import { UserService } from 'src/app/security/services/user.service';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit {

  roles: any;
  users = [];
  rfidSubmitted = false;
  constructor(private _adminService: AdminService, private router: Router) { }

  userForm = new FormGroup(
    {
      id: new FormControl(this._adminService.getUser().id),
      firstname: new FormControl(this._adminService.getUser().firstname, Validators.required),
      lastname: new FormControl(this._adminService.getUser().lastname, Validators.required),
      username: new FormControl(this._adminService.getUser().username, Validators.required),
      password: new FormControl(this._adminService.getUser().password),
      selectedRole: new FormControl(this._adminService.getUser().roles, Validators.required),
    }
  );

  getRoles(): void {
    this._adminService.getRoles().subscribe(
      result => {
        this.roles = result;
      }
    )
  }

  initfunc(): void {
    this.getRoles();
    this._adminService.getRoles().subscribe(
      result => {
        this.roles = result;
      }
    )
  }

  ngOnInit(): void {
    this.initfunc();

    this._adminService.getUsers().subscribe(users => {
      this.roles = [... new Set(users.map(user => user.roles))];
      // console.log(this.roles);
  })
}

  submitted: boolean = false;

  onSubmit() {

    let selectedRoleID = this.userForm.get('selectedRole').value;
    let selectedRole: Role[] = [this.roles.find(role => role.id == selectedRoleID)];

    let userToUpdate = new User(this.userForm.get("id").value, this.userForm.get("firstname").value, this.userForm.get("lastname").value, this.userForm.get("username").value, this.userForm.get("password").value, selectedRole);
    
    this.submitted = true;
    console.log(userToUpdate);

    this._adminService.putUser(userToUpdate).subscribe();
    setTimeout(() => {
      this.router.navigate(["/admin/users"]);
    }, 1000);
  }

  onPushRfid()
  {
    this.rfidSubmitted = true;
    let Id = this.userForm.get("id").value;
    this._adminService.setRfid(Id).subscribe();
    setTimeout(() => {
      this.rfidSubmitted = false;
    }, 4000);
  }

  btnReturn() {
    this.router.navigate(["/admin/users"])
  }

}
