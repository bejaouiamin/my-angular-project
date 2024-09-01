import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserAboutMeComponent } from './user-about-me/user-about-me.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    ActivateAccountComponent,
    TeachersComponent,
    ProfileComponent,
    ResetPasswordComponent,
    UserAboutMeComponent
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
    SocialLoginModule
    
   
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '402898052360-74gr9l0ec01ldtfsc9n3k3sbvrbt6t1r.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
