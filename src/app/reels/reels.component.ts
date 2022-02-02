import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.scss']
})
export class ReelsComponent implements OnInit {
  castingtab:any = 0;
  workshoptab:any = 0;
  shownw:boolean = false;
  showre:boolean = false;
  showen:boolean = false;
  catId:any = 1;
  moviesTab:any = 1;
  back_link :any =  "home";
  imgArray:any;
  imgPath="../../assets/img/img/";
  nextButton = '<div class="arrows"><span class="slick-prev slick-next-bouncing"><img src="https://img.icons8.com/material-sharp/64/ffffff/expand-arrow--v1.png"/></span></div>';
  constructor() { }

  trns_sliders = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,"infinite": false,'nextArrow':this.nextButton,'prevArrow':false, vertical: true, verticalSwiping: true};

  ngOnInit(): void {
    this.imgArray = [
    {
      'image':'1.jpg',
    },
    {
      'image':'2.jpg',
    },
    {
      'image':'3.jpg',
    },
    {
      'image':'4.jpg',
    },
    {
      'image':'5.jpg',
    }];
    console.log(this.imgArray);
  }

  slickInit(e:any) {
    // console.log('slick initialized');
  }    
 

}
