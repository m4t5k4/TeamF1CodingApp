import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveComponent } from './modules/employee/reserve/reserve.component';
import { LocationDetailComponent } from './modules/locations/location-detail/location-detail.component';
import { LocationFormComponent } from './modules/locations/location-form/location-form.component';
import { LocationsComponent } from './modules/locations/locations/locations.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { TablesComponent } from './modules/tables/tables/tables.component';

const routes: Routes = [
  { path: 'employee', component: ReserveComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'location', component: LocationsComponent },
  { path: 'location/add', component: LocationFormComponent },
  { path: 'location/edit', component: LocationDetailComponent},
  { path: 'tables', component: TablesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
