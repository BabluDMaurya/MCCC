import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/_config/config';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  back_link :any =  "signin";
  component_title : string = '';
  constructor(private route : Router,private authenticationService: AuthenticationService) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
      if(Auth){
          this.route.navigate([Config.AfterLogin]);
      }
     }
  }

  ngOnInit(): void {
  }
  completeYourProfile(){
    // this.authenticationService.login(sessionStorage.getItem('email'), sessionStorage.getItem('password'))
    //         .subscribe(
    //             data => {
    //               sessionStorage.clear();
    //               sessionStorage.setItem('profile_status',data.profileStatus);
    //               if(data.profileStatus === 'false'){
                    this.route.navigate(['/upload-images']);
                //   }else{
                //     this.route.navigate(['/home']);
                //   }
                // },
                // error => {
                  
                // });
  }

}
