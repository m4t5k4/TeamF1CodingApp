import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.model';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    roleId: [1],
  });

  constructor(private _authenticateService: AuthenticateService, private router: Router, private fb: FormBuilder) { }
  submitted: boolean = false;

  onSubmit(){
    this.submitted = true;

    let firstname = this.registerForm.value.firstname;
    let lastname = this.registerForm.value.lastname;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJHZWJydWlrZXJzSUQiOiI0IiwiRW1haWwiOiJnbWFpbEBnbWFpbC5jb20iLCJSb2xJRCI6IjEiLCJSb2wiOiJHZWJydWlrZXIiLCJuYmYiOjE2MDc0MjA4MDksImV4cCI6MTYwODAyNTYwOSwiaWF0IjoxNjA3NDIwODA5fQ.66kI5G8gm_mJsqhyy4A1lXfkN8oXatDs3HOSup7raus';
  
    let employee = new Employee(0, firstname, lastname, email, password, 1, token);
    console.log(this.registerForm.value);
    this._authenticateService.register(employee).subscribe();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
