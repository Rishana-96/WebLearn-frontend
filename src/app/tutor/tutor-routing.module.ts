import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorLoginComponent } from './tutor-login/tutor-login.component';
import { TutorSignUpComponent } from './tutor-sign-up/tutor-sign-up.component';
import { TutorHomeComponent } from './tutor-home/tutor-home.component';
import { VerifyComponent } from './verify/verify.component';
import { TutorComponent } from './tutor.component';
import { tutorlogedGuard, tutorlogoutGuard } from '../guard/tutor.guard';
import { AddCourseComponent } from './add-course/add-course.component';

const routes: Routes = [
  { path: '', component: TutorLoginComponent },
  {
    path: 'tutor-login',
    component: TutorLoginComponent,
  },
  {
    path: 'tutor-login/:id',
    component: TutorLoginComponent,
  },
  {
    path: 'tutor-register',
    component: TutorSignUpComponent,
  },
  {
    path: 'home',
    component: TutorHomeComponent,
  },
  { path: 'verify', component: VerifyComponent },
  { path: 'addCourse', component: AddCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorRoutingModule {}
