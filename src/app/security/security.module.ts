import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent, LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders,
    AuthService
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent
  ]
})
export class SecurityModule { }
