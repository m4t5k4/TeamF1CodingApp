import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { EmployeeModule } from './modules/employee/employee.module';
import { SecurityModule } from './security/security.module';
import {  HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EmployeeModule,
    SecurityModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
