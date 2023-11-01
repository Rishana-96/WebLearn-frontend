import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { adminlogedGuard, adminlogoutGuard } from '../guard/admin.guard';
import { ApproveTutorComponent } from './approve-tutor/approve-tutor.component';

const routes: Routes = [
  { path: '', component:AdminLoginComponent,canActivate:[adminlogoutGuard]},
  { path:'dashboard',component:AdminDashboardComponent,canActivate:[adminlogedGuard]},
  { path:'approveTutor',component:ApproveTutorComponent,canActivate:[adminlogedGuard]},
  { path:'userList',component:UserListComponent,canActivate:[adminlogedGuard]},
  { path:'tutorList',component:TutorListComponent,canActivate:[adminlogedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
