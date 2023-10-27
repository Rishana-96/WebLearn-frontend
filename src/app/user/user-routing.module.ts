import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { VerifyComponent } from './verify/verify.component';
import { userlogedGuard, userlogoutGuard } from '../guard/user.guard';

const routes: Routes = [

  { path: '', component: UserHomeComponent  },
  { path: 'login', component: UserLoginComponent ,canActivate:[userlogedGuard]},
  { path: 'login/:id', component: UserLoginComponent,canActivate:[userlogedGuard]},
  { path: 'register', component: UserRegisterComponent,canActivate:[userlogedGuard] },
  { path: 'verify', component: VerifyComponent,canActivate:[userlogedGuard] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
