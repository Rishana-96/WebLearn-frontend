import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorLoginComponent } from './tutor-login/tutor-login.component';
import { TutorSignUpComponent } from './tutor-sign-up/tutor-sign-up.component';
import { TutorHomeComponent } from './tutor-home/tutor-home.component';
import { VerifyComponent } from './verify/verify.component';
import { TutorComponent } from './tutor.component';
import { tutorlogedGuard, tutorlogoutGuard } from '../guard/tutor.guard';

const routes: Routes = [
  { path:'',component:TutorComponent},
  { path:'tutor-login',component:TutorLoginComponent,canActivate:[tutorlogoutGuard]},
  { path:'tutor-login/:id', component: TutorLoginComponent,canActivate:[tutorlogedGuard]},
  { path:'tutor-register',component:TutorSignUpComponent,canActivate:[tutorlogoutGuard]},
  { path:'home',component:TutorHomeComponent,canActivate:[tutorlogedGuard]},
  { path:'verify', component: VerifyComponent },
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule { }
