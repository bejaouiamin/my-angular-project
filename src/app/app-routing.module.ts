import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { TeachersComponent } from './teachers/teachers.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserAboutMeComponent } from './user-about-me/user-about-me.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'user-about-me/:id' , component: UserAboutMeComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
