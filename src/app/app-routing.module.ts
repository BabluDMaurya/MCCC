import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { SplashComponent } from './splash/splash.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { RegistrationComponent } from './signup/registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';

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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
