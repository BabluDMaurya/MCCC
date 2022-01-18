import { Component, OnInit } from '@angular/core';
import { QuoteList } from 'src/app/_config/quote-list';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent implements OnInit {
  screen = 'workshop';
  lists = QuoteList.List;
  showquote : boolean = true;
  constructor() { }
  //-----slick slider------------//    
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,autoplay: true,autoplaySpeed: 5000,'nextArrow':false,'prevArrow':false,fade:true};
  slides = [
    {"no": 1,class1:"first",class2:"casting-content",class3:"slide-btn1",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Casting Call",des:" It is not just body building, photoshoots, socialising that will land you your big break in movies, but it is your audition that will decide your future.", skipBtn:"Skip"},
    {"no": 2,class1:"second",class2:"traning-content",class3:"slide-btn2",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Training",des:"Hone your skills of acting. Focus on your craft and stay positive; then there is no stopping.", skipBtn:"Skip"},
    {"no": 3,class1:"third",class2:"event-content",class3:"slide-btn3",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Workshop",des:"If you’re a good ACTOR, a passport size photo is enough.", skipBtn:"Skip"},
    // {"no": 4,class1:"fourth",class2:"bTs-content",class3:"slide-btn4",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"BTS",des:"Please focus on acting. Keep working on your skill and trust your own talent.",link:"/signin-signup", skipBtn:"Next"}
  ];
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
    //-----show quote-------//
    if (localStorage.getItem(this.screen+'-quotes') != null) {
      var qd:any = localStorage.getItem(this.screen+'-quotes');
      let ld :any  = JSON.parse(qd)
      if(ld.length == this.lists.length){
        this.showquote = false;
      }else{
        this.showquote = true;
      }
    }
  }

}
