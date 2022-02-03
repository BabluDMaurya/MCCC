import { Component, NgModule, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {BtsVideosService} from '../../_service/bts-videos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../_config/config';
import { Location } from '@angular/common';
import { DashboardService } from 'src/app/_service/dashboard.service';
declare var toastbox: any;
declare var $: any;

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  @ViewChild("iframe") iframe: ElementRef | any;
  back_link :any =  "bts-inner/1";
  component_title : string = '';
  btsCategoryId: any;
  btsVideoId: any;
  dataLoad: any = false;
  expanded = 0;
  hostUrl:string = Config.Host+'backend2/';
  videoNotFound :boolean = false;
  descLength: any;
  resData: any;
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  constructor(private actRoute:ActivatedRoute,
    private route : Router,
    private btsVideosService: BtsVideosService,
    private dom:DomSanitizer,
    private location:Location,
    private dashboardService:DashboardService) {
      this.actRoute.paramMap.subscribe((params: ParamMap) => {  
        this.ngOnInit();
      });
     }
    BtsVideos:any;
    vid: any;
    desc: any;
    upNext: any;
    pageName = 'bts-video-view';
    loadMoreButton :boolean = false;
    BtsNextVideos:any;
    getUpnextVideos: boolean = false;
    showupNext : boolean = false;
    displayData:any = [];
  ngOnInit(): void {
    this.dataLoad = true;
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.btsCategoryId = params.get('type');
      this.btsVideoId = params.get('id');
      console.log(params );
      console.log( this.btsCategoryId );
      // this.ngOnInit();
    });
 this.btsVideosService.bts_videos_cat_by_id({'video_id': this.btsVideoId})
          .subscribe(
                    data => { 
                        console.log("bts_videos_by_id : " ,data);
                        this.BtsVideos = data.data;
                        if(this.BtsVideos[0].video_url != null && this.BtsVideos[0].video_url != ''){
                          this.upNext = data.category_videos;
                          this.vid = this.BtsVideos[0].video_url+'?autoplay=1&modestbranding=1&showinfo=0&amp';
                          this.iframe.nativeElement.contentWindow.location.replace(this.vid);
                          // this.vid = this.BtsVideos[0].video_url+'?autoplay=1&mute=1&enablejsapi=1';
                          console.log("vid : ",this.vid);
                          this.desc = this.BtsVideos[0].description;
                          this.descLength = this.desc.length;
                          this.videoNotFound = false;
                          this.dataLoad = false;
                          let newLength;
                          if(this.upNext.length > 0){
                            this.showupNext = true;
                          }
                          if(this.upNext.length >= this.displayData.length + 10){
                            newLength= this.displayData.length + 10;
                          }else{
                            let newLengthadd = this.upNext.length - this.displayData.length;
                            newLength = this.displayData.length + newLengthadd;
                          }
                          
                        if (newLength > this.upNext.length) {
                            newLength = this.displayData.length;
                        }
                        this.displayData = this.upNext.slice(0, newLength);
                        if (newLength < this.upNext.length) {
                            this.loadMoreButton = true;
                        }else{
                          this.loadMoreButton = false;
                        }
                        }else{
                          this.dataLoad = false;
                          this.videoNotFound = true;
                          console.log("vid not found: ");
                        }                       
                      }); 
    this.btsVideosService.get_bts_videos({'limit': null,'category_id':this.btsCategoryId})
          .subscribe(
                    data => { 
                        console.log(data.data);
                        this.getUpnextVideos = true;
                        this.BtsNextVideos = data.data;
                    }); 
    
  }
  back(){
    this.location.back()
  }

  bookmarkBTS(id:any,status?:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'BTS'})
      .subscribe(res => {
        this.resData = res; 
        if(this.resData.data[0] == 'Bookmark Added'){
          this.BtsVideos[0].bookmark_status = 1;
          this.dashboardService.filter('applyed');
          console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.BtsVideos[0].bookmark_status = 0;
          this.dashboardService.filter('applyed');
          new toastbox(this.toastDanger, 2000);
            setTimeout(() => {
              $('#'+this.toastDanger).removeClass('show');
          }, 2000);
        }     
      });
  }
  loadmore(){
    let newLength;
    if(this.upNext.length >= this.displayData.length + 10){
      newLength= this.displayData.length + 10;
    }else{
      let newLengthadd = this.upNext.length - this.displayData.length;
      newLength = this.displayData.length + newLengthadd;
    }
    
        console.log("displayData :",this.displayData.length);
        console.log("newlength :",newLength);
      if (newLength > this.upNext.length) {
          newLength = this.displayData.length;
      }
      this.displayData = this.upNext.slice(0, newLength);
      if (newLength < this.upNext.length) {
          this.loadMoreButton = true;
      }else{
        this.loadMoreButton = false;
      }
  }
}
