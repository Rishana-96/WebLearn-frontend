import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [

  { path: '', component: UserHomeComponent },
  { path: 'login', component: UserLoginComponent},
  { path: 'login/:id', component: UserLoginComponent},
  { path: 'register', component: UserRegisterComponent },
  { path: 'verify', component: VerifyComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
