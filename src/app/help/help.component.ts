import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_service/common.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  back_link :any =  "home";
  component_title : string = 'Help Center';
  loading:boolean = true;
  datas : any;
  resData:any;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.loading = false;
    this.commonService.getHelp().subscribe(res => {
      this.loading = true;
      this.resData = res;   
      this.datas = this.resData.data;
    },error=>{
      this.loading = false;
    });
  }

}
