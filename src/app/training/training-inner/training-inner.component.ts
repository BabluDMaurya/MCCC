import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TrainingService } from '../../_service/training.service';
import { Config } from '../../_config/config';

import { Location } from '@angular/common';
import { DashboardService } from 'src/app/_service/dashboard.service';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-training-inner',
  templateUrl: './training-inner.component.html',
  styleUrls: ['./training-inner.component.scss']
})
export class TrainingInnerComponent implements OnInit {
  @ViewChild("iframe") iframe: ElementRef | any;
  CategoryId: any;
  VideoId: any;
  loading: boolean= false;
  trainingVideo: any;
  vid: any;
  upNext: any;
  desc: any;
  expanded = 0;
  length: any;
  resData: any;
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  hostUrl:string = Config.Host+'backend2/';
  constructor(private actRoute:ActivatedRoute,
    private trainingService: TrainingService,
    private location:Location,
    private dashboardService:DashboardService) {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {  
      this.ngOnInit();
    });
   }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.CategoryId = params.get('type');
      this.VideoId = params.get('id');
      console.log(params );
      console.log( this.CategoryId );
      // this.ngOnInit();
    });

    this.trainingService.get_training_videos_by_id({'video_id':this.VideoId,'limit':''}).subscribe(res => {
      this.loading = true;
      
      if(res.data == 'No Data'){
        this.trainingVideo = [];
      }else{
        this.trainingVideo = res.data;
        this.vid = this.trainingVideo[0].video_url+'?autoplay=1&modestbranding=1&showinfo=0&amp';
        this.iframe.nativeElement.contentWindow.location.replace(this.vid);
        
        this.upNext = res.category_videos;
        console.log("Next:",this.upNext);
        this.desc = this.trainingVideo[0].description;
        this.length = this.desc.length;
        console.log("desc length:",this.desc.length);
      }
     
      console.log(this.trainingVideo);
    },error=>{
      this.loading = false;
    });
  }

  back(){
    this.location.back()
  }
  bookmarkBTS(id:any,status?:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'event'})
      .subscribe(res => {
        this.dashboardService.filter('applyed');
        this.resData = res; 
        if(this.resData.data[0] == 'Bookmark Added'){
          this.trainingVideo[0].bookmark_status = 1;
          this.dashboardService.filter('applyed');
          console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.trainingVideo[0].bookmark_status = 0;
          this.dashboardService.filter('applyed');
          new toastbox(this.toastDanger, 2000);
            setTimeout(() => {
              $('#'+this.toastDanger).removeClass('show');
          }, 2000);
        }     
      });
  }
}
