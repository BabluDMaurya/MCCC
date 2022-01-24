import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { SplashComponent } from './splash/splash.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { RegistrationComponent } from './signup/registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { BtsComponent } from './bts/bts.component';
import { BtsInnerComponent } from './bts/bts-inner/bts-inner.component';
import { BtsVideoViewComponent } from './bts/bts-video-view/bts-video-view.component';
import { TrainingComponent } from './training/training.component';
import {WorkshopComponent} from './workshop/workshop.component';
import { WorkshopRegistrationComponent } from './workshop/workshop-registration/workshop-registration.component';
import { WorkshopRegistrationFormComponent } from './workshop/workshop-registration-form/workshop-registration-form.component';
import { ThankYouPageComponent } from './workshop/thank-you-page/thank-you-page.component';
import { TrainingInnerComponent } from './training/training-inner/training-inner.component';
import { ImagesComponent } from './common/images/images.component';
import { VideoComponent } from './common/video/video.component';
import { AnatomyComponent } from './common/anatomy/anatomy.component';
import { PersonalComponent } from './common/personal/personal.component';
import { NotificationComponent } from './notification/notification.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
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
import { AuthGuard } from './_helpers/auth.guard';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { SupportComponent } from './support/support.component';
import { PasswordComponent } from './password/password.component';
import { ReelsComponent } from './reels/reels.component';

import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { InnerSplashComponent } from './inner-splash/inner-splash.component';
import { BoardsComponent } from './games/boards/boards.component';
import { ForProducerComponent } from './for-producer/for-producer.component';

// RouterModule.forRoot(Router, {scrollPositionRestoration: 'enabled'})


const routes: Routes = [{    
  path: '',    
  redirectTo: 'password',    
  pathMatch: 'full',    
},
{    
  path: 'password',component: PasswordComponent,    
  data: {title: 'password'}    
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
  path: 'inner-splash',component: InnerSplashComponent,    
  data: {title: 'inner splash'}    
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
  path: 'signin',component: SigninComponent,    
  data: {title: 'signin'}    
},
{    
  path: 'bts',component: BtsComponent,canActivate: [AuthGuard],  
  data: {title: 'BTS'}    
},
{    
  path: 'bts-inner/:id',component: BtsInnerComponent,canActivate: [AuthGuard],  
  data: {storeRoute: false, title: 'BTS Inner'}    
},
{    
  path: 'bts-video-view/:id/:type',component: BtsVideoViewComponent,canActivate: [AuthGuard],
  data: {storeRoute: false,title: 'BTS Inner'}    
},
{    
  path: 'training-video-view/:id/:type',component: TrainingInnerComponent,canActivate: [AuthGuard],
  data: {storeRoute: false,title: 'Training Video'}    
},
{    
  path: 'training',component: TrainingComponent,canActivate: [AuthGuard],  
  data: {title: 'training'}    
},
{    
  path: 'workshop/:id',component: WorkshopComponent,
  data: {storeRoute: false,title: 'Workshop'}    
},
{
  path: 'workshop-registration/:id',component: WorkshopRegistrationComponent,canActivate: [AuthGuard],    
  data: {storeRoute: true,title: 'Workshop Registration'}    
},
{    
  path: 'workshop-registration-form/:id/:type',component: WorkshopRegistrationFormComponent,canActivate: [AuthGuard],   
  data: {title: 'Workshop Registration Form'}    
},
//----casting----------//
{    
  path: 'casting/:id',component: CastingComponent,canActivate: [AuthGuard],
  data: {title: 'casting'}    
},
{    
  path: 'casting-inner/:id',component: CastingInnerComponent,canActivate: [AuthGuard],
  data: {title: 'casting inner'}    
},
{    
  path: 'casting-inner/:id/:tab',component: CastingInnerComponent,canActivate: [AuthGuard],
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
  path: 'thank-you-workshop/:name',component: ThankYouPageComponent,canActivate: [AuthGuard],  
  data: {title: 'Thank You'}    
},
{    
  path: 'thank-you-workshop',component: ThankYouPageComponent,canActivate: [AuthGuard],  
  data: {title: 'Thank You'}    
},
{    
  path: 'images',component: ImagesComponent,canActivate: [AuthGuard],  
  data: {title: 'Images'}    
},
{    
  path: 'anatomy',component: AnatomyComponent,canActivate: [AuthGuard],    
  data: {storeRoute: true,title: 'Anatomy'}    
},
{    
  path: 'personal',component: PersonalComponent,canActivate: [AuthGuard],   
  data: {storeRoute: false,title: 'personal'}    
},
{    
  path: 'personal/:page/:id',component: PersonalComponent,canActivate: [AuthGuard],   
  data: {storeRoute: false,title: 'personal'}    
},
{    
  path: 'video',component: VideoComponent,canActivate: [AuthGuard],    
  data: {storeRoute: false,title: 'Video'}    
},
{
  path: 'notification',component: NotificationComponent,canActivate: [AuthGuard],    
  data: {title: 'Notification Panel'} 
},
{   
  path: 'home',component: HomeComponent,canActivate: [AuthGuard],   
  data: {storeRoute: false,title: 'home'}    
},
{    
  path: 'games',component: GamesComponent,canActivate: [AuthGuard],   
  data: {storeRoute: true,title: 'games'}    
},
{    
  path: 'bollywood-memory-game',component: BollywoodMemoryGameComponent,canActivate: [AuthGuard],   
  data: {title: 'bollywood memory game'}    
},
{    
  path: 'tic-tac-toe-game',component: BoardsComponent,canActivate: [AuthGuard],   
  data: {title: 'tic tac toe game'}    
},
{    
  path: 'my-applications',component: MyApplicationsComponent,canActivate: [AuthGuard],   
  data: {storeRoute: true,title: 'my applications'}    
},
{    
  path: 'my-application-inner/:id',component: MyApplicationInnerComponent,canActivate: [AuthGuard],   
  data: {title: 'my application inner'}    
},
{    
  path: 'bookmark',component: BookmarkComponent,canActivate: [AuthGuard],   
  data: {storeRoute: true,title: 'bookmark'}    
},
{    
  path: 'about',component: AboutComponent,canActivate: [AuthGuard],   
  data: {storeRoute: true,title: 'about'}    
},
{    
  path: 'faq',component: FaqComponent,canActivate: [AuthGuard],   
  data: {storeRoute: true,title: 'faq'}    
},
{    
  path: 'help',component: HelpComponent,canActivate: [AuthGuard],   
  data: {storeRoute: true,title: 'help'}    
},
{    
  path: 'terms-condition',component: TermsConditionComponent,canActivate: [AuthGuard],   
  data: {storeRoute: true,title: 'terms and condition'}    
},
{    
  path: 'no-internet',component: NoInternetComponent,   
  data: {title: 'no internet'}    
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
  path: 'support',component: SupportComponent,canActivate: [AuthGuard],   
  data: {title: 'support'}    
},
{    
  path: 'for-producer',component: ForProducerComponent,canActivate: [AuthGuard],   
  data: {title: 'for-producer'}    
},
{    
  path: 'reels',component: ReelsComponent,canActivate: [AuthGuard],   
  data: {title: 'reels'}    
},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
