import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Config } from '../_config/config';
import { NotificationService } from '../_service/notification.service';
import {WorkshopService} from '../_service/workshop.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  stickymenu = 'workshop';
  pageName = 'workshop';
  upcomingData: any;
  loading = false;
  endingsoonData: any;
  previosData: any;
  expanded = 0;
  workshsopData: any;
  eventForYouData: any;
  onGoingData: any;
  upcoming: any;
  constructor(private workshopService: WorkshopService,
              private route:Router,private actRoute:ActivatedRoute,
              private notifyService : NotificationService,
              private dashboardService: DashboardService) { }
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": true,};
 trns_sliders = {"slidesToShow": 4, "slidesToScroll": 4,"dots": false,"infinite": false};
 catId: any;
 status: boolean = false;
 cardnum:any;
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
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.catId = params.get('id');
    });

    this.workshopService.get_all_workshop_data('').subscribe(
      data => { 
        this.workshsopData = data.data;
        this.eventForYouData = this.workshsopData.event_for_u;
        this.onGoingData = this.workshsopData.on_going;
        this.upcoming = this.workshsopData.upcoming;
        this.loading = true;
        if(this.upcomingData == 'No Data'){
          this.upcomingData = [];
        }
        console.log(this.upcomingData);
    });
    this.workshopService.get_upcoming_workshop_data({'limit': ''}).subscribe(
      data => { 
        this.upcomingData = data.data;
        this.loading = true;
        if(this.upcomingData == 'No Data'){
          this.upcomingData = [];
        }
        console.log(this.upcomingData);
    });

    this.workshopService.get_endingsoon_workshop_data({'limit': ''}).subscribe(
      data => { 
        this.loading = true;
        this.endingsoonData = data.data;
        if(this.endingsoonData == 'No Data'){
          this.endingsoonData = [];
        }
        console.log(this.endingsoonData);
    });
  
  this.workshopService.get_previous_workshop_data({'limit': ''}).subscribe(
      data => { 
        this.loading = true;
        this.previosData = data.data;
        if(this.previosData == 'No Data'){
          this.previosData = [];
        }
        console.log(this.previosData);
  });
  }
  tab(data:any){
    this.catId = data;
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
  bookmarkEvent(id:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'workshop'})
      .subscribe(res => {
        // this.resData = res;        
        // this.callEnding = this.resData.data; 
        this.showToasterSuccess();      
      });
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Workshop saved successfully !!", "")
}
doHtmlDisplay(text:any, limit = 50) {
  if (text.length > limit) {
   text = text.substring(0, limit) + '...';
  } else {
   text;
  }
  return text;
 }
}
