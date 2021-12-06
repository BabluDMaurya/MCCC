import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { LogoComponent } from './logo/logo.component';
import { SplashComponent } from './splash/splash.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { RegistrationComponent } from './signup/registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { CreatePasswordComponent } from './signup/create-password/create-password.component';
import { SuccessComponent } from './signup/success/success.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UploadVideoComponent } from './complete-profile/upload-video/upload-video.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile/complete-profile.component';
import { FinalSuccessComponent } from './complete-profile/final-success/final-success.component';
import { UploadImagesComponent } from './complete-profile/upload-images/upload-images.component';

const routes: Routes = [{    
  path: '',    
  redirectTo: 'logo',    
  pathMatch: 'full',    
},
{    
  path: 'logo',component: LogoComponent,    
  data: {title: 'logo'}    
},
{    
  path: 'splash',component: SplashComponent,    
  data: {title: 'splash'}    
},
{    
  path: 'signin-signup',component: SigninSignupComponent,    
  data: {title: 'signin signup'}    
},
{    
  path: 'registration',component: RegistrationComponent,    
  data: {title: 'registration'}    
},
{    
  path: 'create-password',component: CreatePasswordComponent,    
  data: {title: 'create password'}    
},
{    
  path: 'success',component: SuccessComponent,    
  data: {title: 'success'}    
},
{    
  path: 'signin',component: SigninComponent,    
  data: {title: 'registration'}    
},
{    
  path: 'forgot-password',component: ForgotPasswordComponent,    
  data: {title: 'forgot password'}    
},
{    
  path: 'reset-password/:token',component: ResetPasswordComponent,    
  data: {title: 'reset password'}    
},
{    
  path: 'upload-images',component: UploadImagesComponent,canActivate: [AuthGuard], 
  data: {title: 'Upload Images'}    
},
{    
  path: 'upload-video',component: UploadVideoComponent,canActivate: [AuthGuard],
  data: {title: 'Upload Video'}    
},
{    
  path: 'complete-profile',component: CompleteProfileComponent,canActivate: [AuthGuard],  
  data: {title: 'complete profile'}    
},
{    
  path: 'final-success',component: FinalSuccessComponent,canActivate: [AuthGuard],
  data: {title: 'final success'}    
},
{    
  path: 'home',component: HomeComponent,canActivate: [AuthGuard],   
  data: {title: 'registration'}    
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
