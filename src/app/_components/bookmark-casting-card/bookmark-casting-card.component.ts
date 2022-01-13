import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NotificationService } from 'src/app/_service/notification.service';
declare var toastbox: any;
declare var $: any;

@Component({
  selector: 'app-bookmark-casting-card',
  templateUrl: './bookmark-casting-card.component.html',
  styleUrls: ['./bookmark-casting-card.component.scss']
})
export class BookmarkCastingCardComponent implements OnInit {
  @Output() bookmarkCount = new EventEmitter<number>();
  @Input() data:any;
  @Input() bookmarkCountParent : any;
  toastSuccess:string = 'toast-15';
  toastDanger:string = 'toast-16';
  resData:any;
  bookmarkcount : number = 0 ;
  constructor(
    private route : Router,
    private notifyService : NotificationService,
    private dashboardService:DashboardService,
    ) { }
    calBookmark(value: number) {
      this.bookmarkCount.emit(value);
    }
  ngOnInit(): void {
    this.bookmarkcount = this.bookmarkCountParent;
  }
  doHtmlDisplay(text:any, limit = 50) {
    if (text.length > limit) {
     text = text.substring(0, limit) + '...';
    } else {
     text;
    }
    return text + ' <span>View More</span>';
   }
   castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }

  bookmarkCasting(id:any,status?:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
      .subscribe(res => {
        this.resData = res;        
        if(this.resData.data[0] == 'Bookmark Added'){
          let bookco = this.bookmarkcount + 1 ;
          this.calBookmark(bookco);
          this.data.bookmark_status = 1;
          this.dashboardService.filter('applyed');
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        }
        if(this.resData.data[0] == 'Bookmark removed'){
          // console.log("before substraction : ", this.bookmarkcount);
          let bookco:number = (this.bookmarkcount - 1) ;
          this.bookmarkcount = bookco;
          this.dashboardService.filter('applyed');
          // this.calBookmark(bookco);
          this.data.bookmark_status = 0;
          new toastbox(this.toastDanger, 2000);
            setTimeout(() => {
              $('#'+this.toastDanger).removeClass('show');
          }, 2000);
        }
        if(status == 1){
          $('#card-'+id).remove();
        }
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
