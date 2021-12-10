import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_service/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  back_link :any =  "home";
  component_title : string = 'About Us';
  data : any;
  loading:boolean = true;
  resData:any;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.loading = false;
    this.commonService.getAboutMCCC().subscribe(res => {
      this.loading = true;
      this.resData = res;   
      this.data = this.resData.data.discription;
    },error=>{
      this.loading = false;
    });
  }

}
