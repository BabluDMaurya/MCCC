import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bts-category-card',
  templateUrl: './bts-category-card.component.html',
  styleUrls: ['./bts-category-card.component.scss']
})
export class BtsCategoryCardComponent implements OnInit {

  constructor() {
   }
   trns_sliders = {"slidesToShow": 3.5, "slidesToScroll": 3,"initial":0.5,"dots": false,"infinite": false,'nextArrow':false,'prevArrow':false};
  @Input() data:any;
  ngOnInit(): void {
    console.log(this.data);
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
