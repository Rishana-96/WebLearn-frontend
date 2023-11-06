import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { MaterialModule } from '../material.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from './verify/verify.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
    UserHomeComponent,
    UserLoginComponent,
    UserRegisterComponent,
    VerifyComponent,
    FooterComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    

  ]
})
export class UserModule { }
