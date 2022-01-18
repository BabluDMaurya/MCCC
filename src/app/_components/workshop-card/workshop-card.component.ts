import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';

import {WorkshopService} from '../../_service/workshop.service';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.scss']
})
export class WorkshopCardComponent implements OnInit {
  @Input() data:any;
  upcomingData: any;
  loading = false;
  endingsoonData: any;
  previosData: any;
  expanded = 0;
  workshsopData: any;
  eventForYouData: any;
  onGoingData: any;
  upcoming: any;
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  resData:any;
  constructor(private workshopService: WorkshopService,
    private route : Router,
    private dashboardService:DashboardService,
    ) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.workshopService.get_all_workshop_data('').subscribe(
      data => { 
        // this.workshsopData = data.data;
        // this.eventForYouData = this.workshsopData.event_for_u;
        // this.onGoingData = this.workshsopData.on_going;
        // this.upcoming = this.workshsopData.upcoming;
        // this.loading = true;
        if(this.upcomingData == 'No Data'){
          this.upcomingData = [];
        }
        console.log(this.upcomingData);
    });
  }
  bookmarkCasting(id:any,status?:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'workshop'})
      .subscribe(res => {
        this.dashboardService.filter('applyed');
        this.resData = res; 
        if(this.resData.data[0] == 'Bookmark Added'){
          this.data.bookmark_status = 1;
          this.dashboardService.filter('applyed');
          console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.data.bookmark_status = 0;
          this.dashboardService.filter('applyed');
          new toastbox(this.toastDanger, 2000);
            setTimeout(() => {
              $('#'+this.toastDanger).removeClass('show');
          }, 2000);
        }
        // if(status == 1){
        //   $('#card-'+id).remove();
        // }
        // this.showToasterSuccess();      
      });
  }
  // doHtmlDisplay(text:any, limit = 50) {
  //   if (text.length > limit) {
  //    text = text.substring(0, limit) + '...';
  //   } else {
  //    text;
  //   }
  //   return text;
  //  }

   doHtmlDisplay(text:any, limit = 50) {
    if (text.length > limit) {
     text = text.substring(0, limit) + '...';
    } else {
     text;
    }
    return text + ' <span>View More</span>';
   }
   workshopInner(id:any){
    this.route.navigate(['workshop-registration',id]);
  }

}
