import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/_config/config';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  readytoredirect : boolean = false;
  slides = [
    {"no": 1,class1:"first",class2:"casting-content",class3:"slide-btn1",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Just Act",des:"Get updates on the most recent casting calls of features films, TV commercials and other mediums. Resgister NOW!", skipBtn:"Next"},

    // {"no": 1,class1:"first",class2:"casting-content",class3:"slide-btn1",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Casting Call",des:"Get updates on the most recent casting calls of features films, TV commercials and other mediums. Resgister NOW!", skipBtn:"Skip"},
    // {"no": 2,class1:"second",class2:"traning-content",class3:"slide-btn2",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Training",des:"Don't stop growing. Never limit your acting abilities. Our Acting training will provide you the challenge that you as an actor desperately require", skipBtn:"Skip"},
    // {"no": 3,class1:"third",class2:"event-content",class3:"slide-btn3",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Workshop",des:"Be a part of the most exciting events at Indian Cinema just by signing-up on your smartphone.", skipBtn:"Skip"},
    // {"no": 4,class1:"fourth",class2:"bTs-content",class3:"slide-btn4",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"BTS",des:"Get the most of what's happening 'Behind The Screen'. Anywhere. Everywhere.",link:"/signin-signup", skipBtn:"Next"}
  ];
  //-----slick slider------------//    
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,"autoplay": true,"infinite": true,
  fade: true,
  "autoplaySpeed": 10000,method:{
    "slickPause" : true
  }};
  slickInit(e:any) {
    // console.log('slick initialized');
  }    
  breakpoint(e:any) {
    // console.log('breakpoint');
  }    
  afterChange(e:any) {
    // console.log("afterchange : " , e);
    // console.log("afterchange : " , e.last);
    if(e.last){
      this.readytoredirect = true;      
    }
  }    
  beforeChange(e:any) {
    // console.log("beforeChange : " , e);
    // console.log("this.readytoredirect : " , this.readytoredirect);
    // console.log("currentSlide : " , e.currentSlide);
    // console.log("nextSlide : " , e.nextSlide);
    if(this.readytoredirect && e.currentSlide == 3 && e.nextSlide == 0){      
      this.route.navigate(["/signin-signup"]);
    }
    // console.log('beforeChange');
  } 
  slickPause(){

  }
  //-----slick slider------------//
  constructor(
    private route : Router,
    private authenticationService: AuthenticationService,
  ) { 
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

}
