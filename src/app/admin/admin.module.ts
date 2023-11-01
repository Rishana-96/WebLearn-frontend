import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import {NgConfirmModule} from 'ng-confirm-box';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { ApproveTutorComponent } from './approve-tutor/approve-tutor.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserListComponent,
    AdminNavComponent,
    AdminSidebarComponent,
    TutorListComponent,
    DialogComponent,
    ApproveTutorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgConfirmModule,
    FormsModule
  ]
})
export class AdminModule { }
