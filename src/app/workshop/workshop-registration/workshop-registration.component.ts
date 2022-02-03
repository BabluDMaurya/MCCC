import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Config } from '../../_config/config';
import {WorkshopService} from '../../_service/workshop.service';
import { Location,formatDate,DatePipe} from '@angular/common';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NotificationService } from 'src/app/_service/notification.service';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-workshop-registration',
  templateUrl: './workshop-registration.component.html',
  styleUrls: ['./workshop-registration.component.scss']
})
export class WorkshopRegistrationComponent implements OnInit {
  stickymenu = 'workshop registration';
  id: any;
  bgImage: any;
  bookmarks:any;
  bmkStatus:any;
  resData :any;
  workshopData: any;
  myDate = new Date();
  hostUrl:string = Config.Host+'backend2/';
  checkData: any;
  prevDate: boolean = true;
  eventDate: any;
  dataLoad: boolean = false;
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  Apiloading : boolean = false;
  constructor(private notifyService : NotificationService,private location: Location,private workshopService: WorkshopService,
    private route:Router,private actRoute:ActivatedRoute,public datepipe: DatePipe,private dashboardService : DashboardService) {
      this.dashboardService.listen().subscribe((e:any)=>{
        this.ngOnInit();
      });
     }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.id = params.get('id');
    });
    this.Apiloading  = true;
    this.workshopService.get_each_workshop_data({'id': this.id}).subscribe(
      data => { 
        this.Apiloading = false;
        console.log(data);
        if(data.data == 'No Data'){
          this.workshopData = 'No Data';
          this.dataLoad = true;
        }else{
        this.workshopData = data.data[0];
        this.dataLoad = true;
        var cur_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        if(cur_date > this.workshopData.closing_date){
          this.prevDate = false;
        }
        let date1 = new Date(this.workshopData.start_date); 
        let date2 = new Date(this.workshopData.closing_date);
        if(this.isDatesEqual(date1,date2)){        
          this.eventDate = this.datepipe.transform(this.workshopData.start_date, 'MMM d, y');
        }else{
          this.eventDate = this.datepipe.transform(this.workshopData.start_date, 'MMM d, y') +' - '+this.datepipe.transform(this.workshopData.closing_date, 'MMM d, y');
        }
        console.log(this.workshopData.start_date);
        this.bgImage = this.hostUrl+this.workshopData.banner_img_path+'/'+this.workshopData.banner_image;
      }  
    });
    this.workshopService.check_for_apply({'workshop_id': this.id}).subscribe(
      data => { 
        this.checkData = data;
    });
  }
  bookmarkCasting(id:any,status?:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'workshop'})
      .subscribe(res => {
        this.dashboardService.filter('applyed');
        this.resData = res; 
        if(this.resData.data[0] == 'Bookmark Added'){
          this.workshopData.bookmark_status = 1;
          this.dashboardService.filter('applyed');
          console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.workshopData.bookmark_status = 0;
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

  back(): void {
    this.location.back()
  }  
  isDatesEqual(date1:any, date2:any) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  bookmark(id:any){
    this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'workshop'})
      .subscribe(res => {
        this.resData = res; 
        this.bmkStatus = this.resData.data[0];
        if(this.bmkStatus === 'Bookmark removed'){
          this.bookmarks = 0;
          this.notifyService.showSuccess("Bookmark removed", "")
        }else if(this.bmkStatus === 'Bookmark Added'){
          this.bookmarks = 1;
          this.notifyService.showSuccess("Bookmark Added", "")

        }  
      });
  }
}
