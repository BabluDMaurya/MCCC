import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Config } from 'src/app/_config/config';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NotificationService } from 'src/app/_service/notification.service';
const pageName = 'casting';

@Component({
  selector: 'app-casting',
  templateUrl: './casting.component.html',
  styleUrls: ['./casting.component.scss']
})
export class CastingComponent implements OnInit {
  castingtab:any = 1;
  workshoptab:any = 0;
  shownw:boolean = false;
  showre:boolean = false;
  showen:boolean = false;
  pageName = 'casting';
  stickymenu = 'casting';
  castingId:any;
  resData:any;
  castings:any;
  baseUrl :string = Config.Host+'backend2/';
  long_description:any;
  image:any;
  catId:any;
  callEndingSoon:any = [];
  recomended:any;
  loading = false;
  castingData = true;
  recommendData = true;
  endingSoonData = true;
  status: boolean = false;
    cardnum:any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private dashboardService:DashboardService,
  ) { }

  ngOnInit(): void {  
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.catId = params.get('id');
      console.log("catId : ", this.catId);
    });
    this.loading = false;
    this.getCastingData();
    this.getRecomendedData();
    this.getCallEndingSoonData();
  }
  tab(data:any){
    this.catId = data;
    console.log("catId : ", this.catId);
  }
  getCastingData(){
    this.dashboardService.castingCall(null)
      .subscribe(res => {
        this.loading = true;
        this.resData = res;        
        this.castings = this.resData.data;  
        if(this.castings.length > 0 && this.castings != 'No data found'){
          console.log("castingData 1 : ",this.castings.length);
          this.loading = false;
          this.shownw = true;
          this.castingData = false;
        }else{
          console.log("castingData 1 : ",this.castings.length);
          this.shownw = false;
          this.castingData = false;
        }
      });
  }
  getCallEndingSoonData(){
    this.dashboardService.callEndingSoon(null)
      .subscribe(res => {
        this.loading = true;
        this.resData = res;        
        this.callEndingSoon = this.resData.data;  
        if(this.callEndingSoon.length > 0 && this.callEndingSoon != 'No data found'){
          // console.log("castingData 2 : ",this.callEndingSoon.length);
          this.endingSoonData = false;
          this.showen = true;
        }else{
          this.showen = false;
        }   
      });
  }
  getRecomendedData(){
    this.dashboardService.recomendedCasting(null)
      .subscribe(res => {
        this.loading = true;
        this.resData = res;        
        this.recomended = this.resData.data;  
        if(this.recomended.length > 0 && this.recomended != 'No Record Found'){
          console.log("castingData 3 : ",this.recomended.length);
          this.recommendData = false;
          this.showre = true;
        }else{
          console.log("castingData 3 : ",this.recomended.length);
          this.recommendData = false;
          this.showre = false;
        }       
      });
  }  
  clickEvent(id:any){
    if(this.status){
      this.status = false;
      this.cardnum = id;
    }else{
      this.status = true;
      this.cardnum = id;
    }
  }
  


}
