import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { Config } from '../_config/config';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  back_link :any =  "home";
  component_title : string = 'Bookmarks';
  loading: boolean = false;
  castings: any;
  eventBookmarkData :any;
  workshopBookmarkData :any;
  catId:any;
  bookmarkNoData : boolean = false;
  eventbookmarkNoData :boolean = true;
  workshopbookmarkNoData :boolean = false;
  btsBookmarkData: any;
  hostUrl:string = Config.Host+'backend2/';
  expanded = 0;
  resData: any;
  
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  btsBookmarkNoData: boolean = true;
  constructor(private dashboardService:DashboardService,
    private route : Router,) {
      this.dashboardService.listen().subscribe((e:any)=>{
        this.ngOnInit();
      });
     }

  ngOnInit(): void {
    this.catId = 1;
    this.dashboardService.getUserBookmark('')
        .subscribe(res => {
          this.loading = true;
              this.castings = res.data;
              if(this.castings.length > 0){
                this.bookmarkNoData = false;
              }else{
                this.bookmarkNoData = true;
              }
        });
        this.dashboardService.getUserBookmarkEvent('')
        .subscribe(res => {
          this.loading = true;
          this.eventBookmarkData = res.data;

              if(this.eventBookmarkData.length > 0){
              this.eventbookmarkNoData = false;
              }
              // console.log(res.data);
        });
        this.dashboardService.getUserBookmarkWorkshop('')
        .subscribe(res => {
          this.loading = true;
              this.workshopBookmarkData = res.data;
              if(this.workshopBookmarkData.length > 0){
                this.workshopbookmarkNoData = false;
              }else{
                this.workshopbookmarkNoData = true;
              }
              console.log(this.workshopBookmarkData);
        });
        
        this.dashboardService.getUserBookmarkBTS('')
        .subscribe(data => {
          this.loading = true;
          this.btsBookmarkData = data.data;
              if(this.btsBookmarkData.length > 0){
                this.btsBookmarkNoData = false;
              }
              console.log(data.data);
        });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }
  eventInner(id:any){
    this.route.navigate(['event-inner',id]);
  }
  tab(data:any){
    this.catId = data;
  }
  bookmarkBTS(id:any,index?:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'BTS'})
      .subscribe(res => {
        this.resData = res; 
        if(this.resData.data[0] == 'Bookmark Added'){
          this.btsBookmarkData[index].bookmark_status = 1;
          this.dashboardService.filter('applyed');
          console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.btsBookmarkData[index].bookmark_status = 0;
          this.dashboardService.filter('applyed');
          new toastbox(this.toastDanger, 2000);
            setTimeout(() => {
              $('#'+this.toastDanger).removeClass('show');
          }, 2000);
        }     
      });
  }
  bookmarkEvent(id:any,index?:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'event'})
      .subscribe(res => {
        this.resData = res; 
        if(this.resData.data[0] == 'Bookmark Added'){
          this.eventBookmarkData[index].bookmark_status = 1;
          this.dashboardService.filter('applyed');
          console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.eventBookmarkData[index].bookmark_status = 0;
          this.dashboardService.filter('applyed');
          new toastbox(this.toastDanger, 2000);
            setTimeout(() => {
              $('#'+this.toastDanger).removeClass('show');
          }, 2000);
        }     
      });
  }
}
