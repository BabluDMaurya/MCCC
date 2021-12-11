import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NotificationService } from 'src/app/_service/notification.service';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-my-application-card',
  templateUrl: './my-application-card.component.html',
  styleUrls: ['./my-application-card.component.scss']
})
export class MyApplicationCardComponent implements OnInit {
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  resData:any;
  @Input() data:any;
  constructor(
    private route : Router,
    private notifyService : NotificationService,
    private dashboardService:DashboardService,
    ) { }

  ngOnInit(): void {
  }
  doHtmlDisplay(text:any, limit = 50) {
    if (text.length > limit) {
     text = text.substring(0, limit) + '...<span>View More</span>';
    } else {
     text;
    }
    return text;
   }
   castingInner(id:any){
    this.route.navigate(['/my-application-inner',id]);
  }

  bookmarkCasting(id:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
      .subscribe(res => {
        this.resData = res;        
        if(this.resData.data[0] == 'Bookmark Added'){
          this.data.bookmark_status = 1;
          console.log('toast added',this.toastSuccess);
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          this.data.bookmark_status = 0;
          new toastbox(this.toastDanger, 2000);
            setTimeout(() => {
              $('#'+this.toastDanger).removeClass('show');
          }, 2000);
        }      
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
