import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', Validators.required]
  });
  
  message = '';
  constructor(private _authenticateService: AuthenticateService, private router: Router, private fb: FormBuilder) { }

  onSubmit() {
    this._authenticateService.authenticate(this.loginForm.value).subscribe(result => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("roleId", result.roleId.toString());
      localStorage.setItem("id", result.id.toString());
      this.router.navigate(["/"])
    },
    error => {
      console.error(error);
      this.message = 'Verkeerde email/ wachwtoord, probeer opnieuw';
      
    });
  }

  ngOnInit(): void {
    if (this._authenticateService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      console.log("Already logged in");
    }
  }

}
