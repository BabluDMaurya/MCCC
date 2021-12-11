import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionServiceModule } from 'ng-connection-service';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';

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
import { BtsComponent } from './bts/bts.component';
import { TrainingComponent } from './training/training.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { BtsInnerComponent } from './bts/bts-inner/bts-inner.component';
import { BtsVideoViewComponent } from './bts/bts-video-view/bts-video-view.component';
import { TrainingInnerComponent } from './training/training-inner/training-inner.component';
import { WorkshopRegistrationComponent } from './workshop/workshop-registration/workshop-registration.component';
import { WorkshopRegistrationFormComponent } from './workshop/workshop-registration-form/workshop-registration-form.component';
import { ThankYouPageComponent } from './workshop/thank-you-page/thank-you-page.component';
import { FooterComponent } from './_components/footer/footer.component';
import { HeaderComponent } from './_components/header/header.component';
import { SidebarsComponent } from './_components/sidebars/sidebars.component';
import { SubHeaderComponent } from './_components/sub-header/sub-header.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImagesComponent } from './common/images/images.component';
import { VideoComponent } from './common/video/video.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NotificationComponent } from './notification/notification.component';
import { AnatomyComponent } from './common/anatomy/anatomy.component';
import { PersonalComponent } from './common/personal/personal.component';
import { CastingComponent } from './casting/casting.component';
import { CastingCardComponent } from './_components/casting-card/casting-card.component';
import { NotFoundDataComponent } from './_components/not-found-data/not-found-data.component';
import { CastingInnerComponent } from './casting/casting-inner/casting-inner.component';
import { ApplyCastingComponent } from './casting/apply-casting/apply-casting.component';
import { ThankYouCastingComponent } from './casting/thank-you-casting/thank-you-casting.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { MyBookmarksComponent } from './my-bookmarks/my-bookmarks.component';
import { GamesComponent } from './games/games.component';
import { BollywoodMemoryGameComponent } from './games/bollywood-memory-game/bollywood-memory-game.component';
import { GameCardComponent } from './games/bollywood-memory-game/game-card/game-card.component';
import { RestartDialogComponent } from './games/bollywood-memory-game/restart-dialog/restart-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApplicationCardComponent } from './my-applications/my-application-card/my-application-card.component';
import { MyApplicationInnerComponent } from './my-applications/my-application-inner/my-application-inner.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { TopHeaderBtlComponent } from './_components/top-header-btl/top-header-btl.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { HelpComponent } from './help/help.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { SuccessComponent } from './signup/success/success.component';
import { FinalSuccessComponent } from './complete-profile/final-success/final-success.component';
import { CreatePasswordComponent } from './signup/create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UploadImagesComponent } from './complete-profile/upload-images/upload-images.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile/complete-profile.component';
import { UploadVideoComponent } from './complete-profile/upload-video/upload-video.component';
import { WorkshopCardComponent } from './_components/workshop-card/workshop-card.component';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { BtsCategoryCardComponent } from './_components/bts-category-card/bts-category-card.component';
import { BtsCardComponent } from './_components/bts-card/bts-card.component';

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
    SuccessComponent,
    BtsComponent,
    FinalSuccessComponent,
    UploadVideoComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompleteProfileComponent,
    UploadImagesComponent,
    TrainingComponent,
    WorkshopComponent,
    BtsInnerComponent,
    BtsVideoViewComponent,
    TrainingInnerComponent,
    WorkshopRegistrationComponent,
    WorkshopRegistrationFormComponent,
    ThankYouPageComponent,
    HeaderComponent,
    FooterComponent,
    SubHeaderComponent,
    SidebarsComponent,
    ImagesComponent,
    VideoComponent,
    NotificationComponent,
    AnatomyComponent,
    PersonalComponent,
    CastingComponent,
    CastingCardComponent,
    NotFoundDataComponent,
    CastingInnerComponent,
    ApplyCastingComponent,
    ThankYouCastingComponent,
    MyApplicationsComponent,
    MyBookmarksComponent,
    GamesComponent,
    BollywoodMemoryGameComponent,
    GameCardComponent,
    RestartDialogComponent,
    MyApplicationCardComponent,
    MyApplicationInnerComponent,
    BookmarkComponent,
    TopHeaderBtlComponent,
    AboutComponent,
    FaqComponent,
    HelpComponent,
    TermsConditionComponent,
    WorkshopCardComponent,
    NoInternetComponent,
    BtsCategoryCardComponent,
    BtsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ConnectionServiceModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    
  ],
  providers: [DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
