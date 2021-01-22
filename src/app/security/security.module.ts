import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ]
})
export class SecurityModule { }
