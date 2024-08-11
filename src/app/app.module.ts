import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { TeachersComponent } from './teachers/teachers.component';
import { ProfileComponent } from './profile/profile.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivateAccountComponent,
    TeachersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CodeInputModule,
    GoogleMapsModule,
    
   
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
