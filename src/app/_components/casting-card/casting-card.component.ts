import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NotificationService } from 'src/app/_service/notification.service';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-casting-card',
  templateUrl: './casting-card.component.html',
  styleUrls: ['./casting-card.component.scss']
})
export class CastingCardComponent implements OnInit {
  @Input() tab?: number;
  @Input() data:any;
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  resData:any;
  constructor(
    private route : Router,
    private notifyService : NotificationService,
    private dashboardService:DashboardService,
    ) { }

  ngOnInit(): void {
  }
  doHtmlDisplay(text:any, limit = 50) {
    if (text.length > limit) {
     text = text.substring(0, limit) + '...';
    } else {
     text;
    }
    return text + ' <span>View More</span>';
   }
   castingInner(id:any,tab:any){
    this.route.navigate(['casting-inner',id,tab]);
  }

  bookmarkCasting(id:any,status?:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
      .subscribe(res => {
        this.resData = res; 
        if(this.resData.data[0] == 'Bookmark Added'){
          this.data.bookmark_status = 1;
          // console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
          this.dashboardService.filter('applyed');
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.data.bookmark_status = 0;
          new toastbox(this.toastDanger, 2000);
          this.dashboardService.filter('applyed');
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
 
  showToasterSuccess(){
    this.notifyService.showSuccess("Casting Call saved successfully !!", "")
}
 
showToasterError(){
    this.notifyService.showError("Something is wrong", "")
}
 
showToasterInfo(){
    this.notifyService.showInfo("This is info", "")
}
 
showToasterWarning(){
    this.notifyService.showWarning("This is warning", "")
}

}
