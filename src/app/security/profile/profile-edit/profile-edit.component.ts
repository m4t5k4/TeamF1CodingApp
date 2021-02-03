import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isEditFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private router: Router, private authService: AuthService) { }

  userForm = new FormGroup(
    {
      id: new FormControl(this.token.getUser().id),
      firstname: new FormControl(this.token.getUser().firstname, Validators.required),
      lastname: new FormControl(this.token.getUser().lastname, Validators.required),
      username: new FormControl(this.token.getUser().username, Validators.required),
      password: new FormControl(this.token.getUser().password, Validators.required),
      role: new FormControl(this.token.getUser().role, Validators.required)
    }
  );

  ngOnInit(): void {
  }

  submitted = false;

  onSubmit(){
    let userToUpdate = new User(this.userForm.get("id").value, this.userForm.get("firstname").value, this.userForm.get("lastname").value, this.userForm.get("username").value, this.userForm.get("password").value, this.userForm.get("role").value);
    
    this.submitted = true;

  }

  btnReturn(): void {
    this.router.navigate(['profile']);
  }
}
