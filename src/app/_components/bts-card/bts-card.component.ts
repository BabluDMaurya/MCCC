import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../_config/config';

@Component({
  selector: 'app-bts-card',
  templateUrl: './bts-card.component.html',
  styleUrls: ['./bts-card.component.scss']
})
export class BtsCardComponent implements OnInit {
  @Input() data:any;
  hostUrl:string = Config.Host+'backend2/';

  constructor() { }
  two_sliders = {"slidesToShow": 2.5, "slidesToScroll": 2,"dots": false,"infinite": false};
  ngOnInit(): void {
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
