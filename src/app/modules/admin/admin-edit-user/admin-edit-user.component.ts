import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit {

  constructor(private _adminService: AdminService, private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  // userForm = this.fb.group({
  //   firstname: ['', Validators.required],
  //   lastname: ['', Validators.required],
  //   username: ['', Validators.required],
  //   password: ['', Validators.required]
  // })

  // id;
  // user: User;

  userForm = new FormGroup(
    {
      id: new FormControl(this._adminService.getUser().id),
      firstname: new FormControl(this._adminService.getUser().firstname, Validators.required),
      lastname: new FormControl(this._adminService.getUser().lastname, Validators.required),
      username: new FormControl(this._adminService.getUser().username, Validators.required),
      password: new FormControl(this._adminService.getUser().password),
      roles: new FormControl(this._adminService.getUser().roles, Validators.required),
      roless: new FormGroup({
        id: new FormControl(''),
        role: new FormControl('')
      })
    }
  );

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe(params  => {
    //   this.id = params.get('id');
    //   this.findUser();
    // });
  }

  // findUser(){
  //   this._adminService.getUser
  // }

  submitted: boolean = false;

  onSubmit() {
    let userToUpdate = new User(this.userForm.get("id").value, this.userForm.get("firstname").value, this.userForm.get("lastname").value, this.userForm.get("username").value, this.userForm.get("password").value, this.userForm.get("roles").value);
    console.log(this.userForm.get(['roles.id']).value);
    this.submitted = true;
    console.log(userToUpdate);
    this._adminService.putUser(this.userForm.value.id, userToUpdate).subscribe();
    setTimeout(() => {
      this.router.navigate(["/admin/users"]);
    }, 1000);
  }

  btnReturn() {
    this.router.navigate(["/admin/users"])
  }

}
