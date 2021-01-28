import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { EmployeeModule } from './modules/employee/employee.module';
import { SecurityModule } from './security/security.module';
import {LocationsModule} from './modules/locations/locations.module'
import {TablesModule} from './modules/tables/tables.module'

import {  HttpClientModule } from '@angular/common/http';
import { NavComponent } from './modules/nav/nav.component';
import { FooterComponent } from './modules/footer/footer.component';
import { AdminComponent } from './modules/admin/admin.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AdminComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EmployeeModule,
    SecurityModule,
    LocationsModule,
    TablesModule,
    MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
