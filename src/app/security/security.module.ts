import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { ProfileComponent } from './profile/profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './services/auth.service';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { SharedModule } from '../shared/shared.module';

import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent, LogoutComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthService
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
    ProfileEditComponent
  ]
})
export class SecurityModule { }
