import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorComponent } from './tutor.component';
import { TutorLoginComponent } from './tutor-login/tutor-login.component';
import { TutorSignUpComponent } from './tutor-sign-up/tutor-sign-up.component';
import { TutorHomeComponent } from './tutor-home/tutor-home.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorNavComponent } from './tutor-nav/tutor-nav.component';
import { VerifyComponent } from './verify/verify.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';

@NgModule({
  declarations: [
    TutorComponent,
    TutorLoginComponent,
    TutorSignUpComponent,
    TutorHomeComponent,
    TutorNavComponent,
    VerifyComponent,
    AddCourseComponent,
    TutorProfileComponent,
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TutorModule {}
