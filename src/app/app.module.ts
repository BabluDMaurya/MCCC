import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LogoComponent } from './logo/logo.component';
import { SplashComponent } from './splash/splash.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { RegistrationComponent } from './signup/registration/registration.component';
import { TopHeaderBTComponent } from './_components/top-header-bt/top-header-bt.component';
import { DateOfBirthComponent } from './_components/date-of-birth/date-of-birth.component';
import { YourMobileNumberComponent } from './_components/your-mobile-number/your-mobile-number.component';
import { SelectYourGenderComponent } from './_components/select-your-gender/select-your-gender.component';
import { YourCountryStateCityComponent } from './_components/your-country-state-city/your-country-state-city.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    SplashComponent,
    SigninSignupComponent,
    RegistrationComponent,
    TopHeaderBTComponent,
    DateOfBirthComponent,
    YourMobileNumberComponent,
    SelectYourGenderComponent,
    YourCountryStateCityComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
