import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PopupComponent } from '../app/modal/popup/popup.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgConfirmModule } from 'ng-confirm-box';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonInterceptor } from './interceptor/common.interceptor';
import { MaterialModule } from './material.module';

//import { CloudinaryModule } from '@cloudinary/ng';
@NgModule({
  declarations: [AppComponent, PopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgConfirmModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ToastrModule.forRoot(), // ToastrModule added here
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
