import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { BtsVideosService } from '../_service/bts-videos.service';
import { DashboardService } from '../_service/dashboard.service';
import {WorkshopService} from '../_service/workshop.service';

import { Config } from '../_config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides :any;
  slideData:boolean = false;
  baseUrl :string = Config.Host+'backend2/';
  shownw:boolean = false;
  showre:boolean = false;
  showen:boolean = false;
  castingtab:any = 0;
  workshoptab:any = 0;
  categories: any;
  loadingbts:boolean = false;
  category_color: any = ['hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)','hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)'];
  resData :any;
  newCasting : any;
  nonewcall:boolean = false;
  nocallend:boolean = false;
  loading:boolean = false;
  loadingnc:boolean = false;
  recomended :any;
  norecomended:boolean = false;
  loadingtrner:boolean = false;
  loadingnr:boolean = false;
  popularBtsVideos: any;
  loadData: any = false;
  workshsopData: any;
  eventForYouData: any;
  onGoingData: any;
  upcoming: any;
  upcomingData: any;
  hostUrl:string = Config.Host+'backend2/';
  topBTSVideos: any;
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private btsVideosService: BtsVideosService,
    private dashboardService : DashboardService,
    private workshopService: WorkshopService,
    ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      let Auth = JSON.stringify(this.authenticationService.currentUserValue.status);
      if (Auth) {
        if (this.authenticationService.currentUserValue.profileStatus  === 'false') {
          this.route.navigate(['/upload-images']);
        }
      } else {
        this.route.navigate(['/signin']);
      }
    } else {
      this.route.navigate(['/signin']);
    }
  }
  //-----slick slider------------//    
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,autoplay: true,autoplaySpeed: 2000,};
  btsSlideConfig = {"slidesToShow": 2.5, initialSlide: 0.5, "slidesToScroll": 2,"dots": false,"infinite": false};
  topBtsSlideConfig = {"slidesToShow": 1, initialSlide: 1, "slidesToScroll": 1,"dots": false,"infinite": false};
  trns_sliders = {"slidesToShow": 3, "slidesToScroll": 3,"dots": false,"infinite": false};
  two_sliders = {"slidesToShow": 2, "slidesToScroll": 2,"dots": false,"infinite": false};
  // addSlide() {
  //   this.slides.push({img: "http://placehold.it/350x150/777777"})
  // }    
  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }    
  slickInit(e:any) {
    // console.log('slick initialized');
  }    
  breakpoint(e:any) {
    // console.log('breakpoint');
  }    
  afterChange(e:any) {
    // console.log('afterChange');
  }    
  beforeChange(e:any) {
    // console.log('beforeChange');
  } 
  //-----slick slider------------//
  ngOnInit(): void {
    this.castingSliderApi();
    this.newCastingCallApi();
    this.getRecomendedData();
    this.btsVideosService.get_categories().subscribe(
      data => { 
        this.loadingbts = true;
        this.categories = data.data;
    });
    this.btsVideosService.get_bts_videos({'limit': 4,'category_id':1}).subscribe(
      data => { 
          this.popularBtsVideos = data.data;
          this.loadData = true;
      });
      this.btsVideosService.get_bts_videos({'limit': 1,'category_id':2}).subscribe(
        data => { 
            this.topBTSVideos = data.data;
            this.loadData = true;
        });
        this.workshopService.get_all_workshop_data('').subscribe(
          data => { 
            this.workshsopData = data.data;
            this.eventForYouData = this.workshsopData.event_for_u;
            this.onGoingData = this.workshsopData.on_going;
            this.upcoming = this.workshsopData.upcoming;
            this.loading = true;
            if(this.upcomingData == 'No Data'){
              this.upcomingData = [];
            }
            console.log(this.upcomingData);
        });
  }
  
  isEven(n:number) {
    return n % 2 == 0;
 } 
 isOdd(n:number) {
    return Math.abs(n % 2) == 1;
 }
 castingSliderApi(){
  this.dashboardService.castingSlider()
    .subscribe(res => {
      this.loading = true;
      this.resData = res;
      if(this.resData.data.length > 0){
        this.slides = this.resData.data;      
        this.slideData = true;    
      }else{
        this.slides = [
          {img: "../../../assets/img/slide1.jpg"},
          {img: "../../../assets/img/slide2.jpg"},
          {img: "../../../assets/img/slide2.jpg"}
        ];
      }        
    });
}
 newCastingCallApi(){
  this.dashboardService.castingCall({limit:1})
    .subscribe(res => {
      
      this.resData = res;        
      this.newCasting = this.resData.data;
      if(this.newCasting.length  == 0){
        this.loadingnc = false;
        this.nonewcall = true;
      }else if(this.newCasting == 'No Record Found'){
        this.nonewcall = true;
      }else{
        this.loadingnc = true;
      }        
    });
}
getRecomendedData(){
  this.dashboardService.recomendedCasting({limit:1})
    .subscribe(res => {
      
      this.resData = res;        
      this.recomended = this.resData.data; 
      if(this.recomended == 'No Record Found'){
        this.norecomended = true;
      }else if(this.recomended.length == 0){
        this.norecomended = true;
        this.loadingnr = false;
      }else{
        this.loadingnr = true;
      }  
      // console.log(this.recomended);      
    });
}
}
