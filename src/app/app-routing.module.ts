import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveComponent } from './modules/employee/reserve/reserve.component';
import { ReservationsComponent } from './modules/employee/reservations/reservations.component'
import { LocationDetailComponent } from './modules/locations/location-detail/location-detail.component';
import { LocationFormComponent } from './modules/locations/location-form/location-form.component';
import { LocationsComponent } from './modules/locations/locations/locations.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ProfileComponent } from './security/profile/profile.component';
import { TablesComponent } from './modules/tables/tables/tables.component';
import { TablesDetailComponent } from './modules/tables/tables-detail/tables-detail.component';
import { LogoutComponent } from './security/logout/logout.component';
import { AuthGuard } from './security/guard/auth.guard';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { AdminUsersComponent } from './modules/admin/admin-users/admin-users.component';
import {DashboardComponent} from './modules/dashboard/dashboard/dashboard.component';
import { AdminEditUserComponent } from './modules/admin/admin-edit-user/admin-edit-user.component';

const routes: Routes = [
  { path: 'employee', component: ReserveComponent, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'location', component: LocationsComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'location/add', component: LocationFormComponent, canActivate: [AuthGuard] },
  { path: 'location/edit', component: LocationDetailComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tables', component: TablesComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'tables', component: TablesComponent},
  { path: 'tables/edit', component: TablesDetailComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/user/edit', component: AdminEditUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
