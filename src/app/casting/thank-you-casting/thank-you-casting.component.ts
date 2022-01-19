import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Router,ParamMap,ActivatedRoute} from '@angular/router';
import { QuoteList } from 'src/app/_config/quote-list';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { QuoteService } from 'src/app/_service/quote.service';

@Component({
  selector: 'app-thank-you-casting',
  templateUrl: './thank-you-casting.component.html',
  styleUrls: ['./thank-you-casting.component.scss']
})
export class ThankYouCastingComponent implements OnInit{
  @ViewChild('openquotedialog') openquotedialog:ElementRef | any;
  screen = 'casting';
  lists = QuoteList.List;
  quote : any;
  applicationNo:any;
  constructor(private _QuoteService:QuoteService,private dashboardService:DashboardService,private route:Router,private actRoute:ActivatedRoute) { 
    
  }

  //-----slick slider------------//    
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,autoplay: true,autoplaySpeed: 5000,'nextArrow':false,'prevArrow':false,fade:true};
  slides = [
    {"no": 1,class1:"first",class2:"casting-content",class3:"slide-btn1",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Casting Call",des:"Rejections can make anyone frustrated. But never quit practicing.", skipBtn:"Skip"},
    {"no": 2,class1:"second",class2:"traning-content",class3:"slide-btn2",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Training",des:"The world has changed. I think we have moved past the hero or a macho physique.", skipBtn:"Skip"},
    {"no": 3,class1:"third",class2:"event-content",class3:"slide-btn3",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"Workshop",des:" Fear of rejection is part of this job. You’re in a profession where you have to deal with it everyday. Don’t judge the feedback you receive based on one day.", skipBtn:"Skip"},
    {"no": 4,class1:"fourth",class2:"bTs-content",class3:"slide-btn4",logo: "../../assets/img/white_logo.webp",img: "../../assets/img/img/GirlImg.webp",title:"BTS",des:"Please focus on acting. Keep working on your skill and trust your own talent.",link:"/signin-signup", skipBtn:"Next"}
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
    this.actRoute.paramMap.subscribe((params: ParamMap) => { 
      this.applicationNo = params.get('application_no');
      this.showQuote();
    });   
  }
  letEx(){
    this.dashboardService.filter('applyed');
    this.route.navigate(['/home']);
  }
  showQuote(){
    this.quote = this._QuoteService.setupQuotes(this.screen);
    if (localStorage.getItem(this.screen+'-quotes') != null) {
      var qd:any = localStorage.getItem(this.screen+'-quotes');
      let ld :any  = JSON.parse(qd)
      if(ld.length <= this.lists.length){
        setTimeout(() => {
          this.openquotedialog.nativeElement.click();
        }, 3000);
      }    
    }
  }
}
