import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-supported-partners',
  templateUrl: './supported-partners.component.html',
  styleUrls: ['./supported-partners.component.scss']
})
export class SupportedPartnersComponent implements OnInit {

  
  constructor() {
  }
  trns_sliders = {"slidesToShow": 2.8, "slidesToScroll": 2.8,"initial":0.5,"dots": false,"infinite": false,'nextArrow':false,'prevArrow':false};
    @Input() data:any;  
    ngOnInit(): void {
      // console.log(this.data);
    }
    isOdd(n:number) {
      return Math.abs(n % 2) == 1;
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
