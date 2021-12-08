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
  path: 'signin',component: SigninComponent,    
  data: {title: 'registration'}    
},
{    
  path: 'home',component: HomeComponent,    
  data: {title: 'registration'}    
},
{    
  path: 'bts',component: BtsComponent,    
  data: {title: 'BTS'}    
},
{    
  path: 'bts-inner/:id',component: BtsInnerComponent,    
  data: {storeRoute: false, title: 'BTS Inner'}    
},
{    
  path: 'bts-video-view/:id/:type',component: BtsVideoViewComponent,
  data: {storeRoute: false,title: 'BTS Inner'}    
},
{    
  path: 'training-video-view/:id/:type',component: TrainingInnerComponent,
  data: {storeRoute: false,title: 'Training Video'}    
},
{    
  path: 'training',component: TrainingComponent,    
  data: {title: 'training'}    
},
{    
  path: 'workshop/:id',component: WorkshopComponent,    
  data: {storeRoute: false,title: 'Workshop'}    
},
{
  path: 'workshop-registration/:id',component: WorkshopRegistrationComponent,    
  data: {storeRoute: true,title: 'Workshop Registration'}    
},
{    
  path: 'workshop-registration-form/:id/:type',component: WorkshopRegistrationFormComponent,   
  data: {title: 'Workshop Registration Form'}    
},
{    
  path: 'thank-you-workshop/:name',component: ThankYouPageComponent,  
  data: {title: 'Thank You'}    
},
{    
  path: 'images',component: ImagesComponent,  
  data: {title: 'Images'}    
},
{    
  path: 'anatomy',component: AnatomyComponent,    
  data: {storeRoute: true,title: 'Anatomy'}    
},
{    
  path: 'personal',component: PersonalComponent,    
  data: {storeRoute: false,title: 'personal'}    
},
{    
  path: 'video',component: VideoComponent,    
  data: {storeRoute: false,title: 'Video'}    
},
{
  path: 'notification',component: NotificationComponent,    
  data: {title: 'Notification Panel'}    
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
