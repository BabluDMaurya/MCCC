import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_service/common.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  back_link :any =  "home";
  component_title : string = 'FAQ`S';
  loading:boolean = true;
  training : any;
  bts : any;
  casting_calls : any;
  events : any;
  common : any;
  resData:any;
  constructor(private commonService:CommonService) { }


  ngOnInit(): void {
    this.loading = false;
    this.commonService.getFAQ().subscribe(res => {
      this.loading = true;
      this.resData = res;   
      // this.bts = this.resData.data.bts;
      // this.casting_calls = this.resData.data.casting_calls;
      // this.events = this.resData.data.events;
      // this.training = this.resData.data.training;
      this.common = this.resData.data.common;
    },error=>{
      this.loading = false;
    });
  }

}
