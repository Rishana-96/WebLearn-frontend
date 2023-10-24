import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';

const routes: Routes = [
  { path: '', component:AdminLoginComponent},
  { path:'dashboard',component:AdminDashboardComponent},
  { path:'userList',component:UserListComponent},
  { path:'tutorList',component:TutorListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
