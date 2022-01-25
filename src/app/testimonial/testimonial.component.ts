import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  back_link:any;
  imgPath="../../assets/img/img/arrow_left.png'";
  prevtButton = '<div class="testimonials_arrows"><span class="slick-next"><img src="../../assets/img/img/arrow_left.png"/></span></div>';
  nextButton = '<div class="testimonials_arrows"><span class="slick-prev"><img src="../../assets/img/img/arrow_left.png"/></span></div>';
  two_sliders = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,"infinite": false,"fade":true,'nextArrow':this.prevtButton,'prevArrow':this.nextButton,};
  constructor() { }

  ngOnInit(): void {
  }
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
}
