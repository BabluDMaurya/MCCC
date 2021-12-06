import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { BtsVideosService } from '../_service/bts-videos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any;
  loadingbts:boolean = false;
  category_color: any = ['hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)','hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)'];

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private btsVideosService: BtsVideosService,
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
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": true,};
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
    this.btsVideosService.get_categories().subscribe(
      data => { 
        this.loadingbts = true;
        this.categories = data.data;
    });
  }
  
  isEven(n:number) {
    return n % 2 == 0;
 } 
 isOdd(n:number) {
    return Math.abs(n % 2) == 1;
 }
}
