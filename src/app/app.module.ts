import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LogoComponent } from './logo/logo.component';
import { SplashComponent } from './splash/splash.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { RegistrationComponent } from './signup/registration/registration.component';
import { TopHeaderBTComponent } from './_components/top-header-bt/top-header-bt.component';
import { DateOfBirthComponent } from './_components/date-of-birth/date-of-birth.component';
import { YourMobileNumberComponent } from './_components/your-mobile-number/your-mobile-number.component';
import { SelectYourGenderComponent } from './_components/select-your-gender/select-your-gender.component';
import { YourCountryStateCityComponent } from './_components/your-country-state-city/your-country-state-city.component';

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
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { SubHeaderComponent } from './_components/sub-header/sub-header.component';
import { SidebarsComponent } from './_components/sidebars/sidebars.component';
import { CastingComponent } from './casting/casting.component';
import { CastingCardComponent } from './_components/casting-card/casting-card.component';

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
    HomeComponent,
    CreatePasswordComponent,
    SuccessComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UploadVideoComponent,
    CompleteProfileComponent,
    FinalSuccessComponent,
    UploadImagesComponent,
    HeaderComponent,
    FooterComponent,
    SubHeaderComponent,
    SidebarsComponent,
    CastingComponent,
    CastingCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
