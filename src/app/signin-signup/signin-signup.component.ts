import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_service/notification.service';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.scss']
})
export class SigninSignupComponent implements OnInit {
  socialUser: SocialUser | undefined;
  isLoggedin: boolean | undefined;
  socialLoginResponce : any;
  localData : any;
  constructor(private socialAuthService: SocialAuthService,
    private route : Router,
    private authenticationService: AuthenticationService,
    private notification :NotificationService) {
       // redirect to home if already logged in
       if (this.authenticationService.currentUserValue) {
        let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
        console.log("Auth:",Auth);
        if(Auth){
            this.route.navigate([Config.AfterLogin]);
        }
        }
     }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      console.log('Login :',user);
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser.provider);      
      if(this.socialUser.provider === 'GOOGLE'){                
        this.authenticationService.social_login({
          provider_name:this.socialUser.provider,
          client_id:this.socialUser.id,
          email:this.socialUser.email,
          name:this.socialUser.name}).pipe(first())
          .subscribe(res=>{
            this.socialLoginResponce = res;
            if(this.socialLoginResponce.status === "true"){               
              localStorage.setItem('currentUser', JSON.stringify(this.socialLoginResponce));
              if(this.socialLoginResponce.profileStatus === "true"){
                this.route.navigate(['/home']);
              }else{
                sessionStorage.setItem('social_login','true');
                sessionStorage.setItem('profile_status','false');
              this.route.navigate(['/profile_first_step']);
              }
              
            }else{
              console.log("response message : "+JSON.stringify(this.socialLoginResponce));
              this.notification.showError(this.socialLoginResponce.message,'Mccc');
              this.socialAuthService.signOut();
            }   
            
        },error=> {
          this.notification.showError(error,'Mccc');          
        });        
      }else if(this.socialUser.provider === 'FACEBOOK'){
        this.authenticationService.social_login({
          provider_name:this.socialUser.provider,
          client_id:this.socialUser.id,
          email:this.socialUser.email,
          name:this.socialUser.name}).pipe(first())
          .subscribe(res=>{
            this.socialLoginResponce = res;
            if(this.socialLoginResponce.status === "true"){     
              localStorage.setItem('currentUser', JSON.stringify(this.socialLoginResponce));                       
              if(this.socialLoginResponce.profileStatus === "true"){
                this.route.navigate(['/home']);
              }else{
                sessionStorage.setItem('social_login','true');
                sessionStorage.setItem('profile_status','false');
              this.route.navigate(['/profile_first_step']);
              }
            }else{              
              this.notification.showError(this.socialLoginResponce.message,'Mccc');
              this.socialAuthService.signOut();
            }  
        },error=> {
          this.notification.showError(error,'Mccc');          
        });
      }      
    });
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }

}
