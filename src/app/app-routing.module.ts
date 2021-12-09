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
import { CastingComponent } from './casting/casting.component';
import { ThankYouCastingComponent } from './casting/thank-you-casting/thank-you-casting.component';
import { CastingInnerComponent } from './casting/casting-inner/casting-inner.component';
import { ApplyCastingComponent } from './casting/apply-casting/apply-casting.component';
import { GamesComponent } from './games/games.component';
import { BollywoodMemoryGameComponent } from './games/bollywood-memory-game/bollywood-memory-game.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { MyApplicationInnerComponent } from './my-applications/my-application-inner/my-application-inner.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { HelpComponent } from './help/help.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

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
//----casting----------//
{    
  path: 'casting',component: CastingComponent,canActivate: [AuthGuard],
  data: {title: 'casting'}    
},
{    
  path: 'casting-inner/:id',component: CastingInnerComponent,canActivate: [AuthGuard],
  data: {title: 'casting inner'}    
},
{    
  path: 'apply-casting/:id',component: ApplyCastingComponent,canActivate: [AuthGuard],    
  data: {title: 'Apply Casting'}   
},
{    
  path: 'thank-you-casting/:application_no',component: ThankYouCastingComponent,canActivate: [AuthGuard],    
  data: {title: 'Thank You Casting'}    
},
{    
  path: 'home',component: HomeComponent,canActivate: [AuthGuard],   
  data: {title: 'registration'}    
},
{    
  path: 'games',component: GamesComponent,canActivate: [AuthGuard],   
  data: {title: 'games'}    
},
{    
  path: 'bollywood-memory-game',component: BollywoodMemoryGameComponent,canActivate: [AuthGuard],   
  data: {title: 'bollywood memory game'}    
},
{    
  path: 'my-applications',component: MyApplicationsComponent,canActivate: [AuthGuard],   
  data: {title: 'my applications'}    
},
{    
  path: 'my-application-inner/:id',component: MyApplicationInnerComponent,canActivate: [AuthGuard],   
  data: {title: 'my application inner'}    
},
{    
  path: 'bookmark',component: BookmarkComponent,canActivate: [AuthGuard],   
  data: {title: 'bookmark'}    
},
{    
  path: 'about',component: AboutComponent,canActivate: [AuthGuard],   
  data: {title: 'about'}    
},
{    
  path: 'faq',component: FaqComponent,canActivate: [AuthGuard],   
  data: {title: 'faq'}    
},
{    
  path: 'help',component: HelpComponent,canActivate: [AuthGuard],   
  data: {title: 'help'}    
},
{    
  path: 'terms-condition',component: TermsConditionComponent,canActivate: [AuthGuard],   
  data: {title: 'terms and condition'}    
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
