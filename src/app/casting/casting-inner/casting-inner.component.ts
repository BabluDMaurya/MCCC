import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/_service/notification.service';

@Component({
  selector: 'app-casting-inner',
  templateUrl: './casting-inner.component.html',
  styleUrls: ['./casting-inner.component.scss']
})
export class CastingInnerComponent implements OnInit {
  back_link = "casting";
  pageName="casting-inner";
  castingId:any;
  resData:any;
  casting:any;
  baseUrl :string = Config.Host+'backend2/';
  long_description:any;
  image:any;
  userdetail:any;
  age:any; 
  castingTitle:any;
  castingDate:any;
  bookmarks:any;
  applySt:any;
  bmkStatus:any;
  loading:boolean = false;
  Apiloading : boolean = false;

  locations :any;
  gender:any;
  role:any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private sanitizer:DomSanitizer,
    private location:Location,
    private notifyService : NotificationService,
    
    ) {} 
  ngOnInit(): void {    
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
    });
    this.getCastingData();
  }
  back(): void {
    // this.route.navigateByUrl('/casting-all/'+this.castingId);
    this.location.back();
    // window.history.back();
  }
  getCastingData(){
    this.Apiloading = true;
    this.loading = false;
    this.dashboardService.castingCall({casting_id:this.castingId}).pipe(first())
    .subscribe(res => {
      console.log(res);
      this.Apiloading = false;
      this.loading = true;
      this.resData = res;   
      this.casting = this.resData.data;
      this.castingTitle =  this.casting.title;
      if(this.casting.bookmark_status != null && this.casting.bookmark_status != ''){
        this.bookmarks =  this.casting.bookmark_status;
      }else{
        this.bookmarks =  0;
      }
      if(this.casting.apply_status != null && this.casting.apply_status != ''){
        this.applySt = this.casting.apply_status.confirm;
      }else{
        this.applySt = 0;
      }
      
      this.castingDate = this.casting.created_at;
      this.locations = this.casting.location;
      this.gender = this.casting.gender;
      this.role = this.casting.role;
      this.age = this.casting.age_range;


      this.image = this.baseUrl+'public/uploads/Admin/CastingImages/'+this.casting.banner_image;
      this.long_description = this.sanitizer.bypassSecurityTrustHtml(this.casting.long_description);
    },error=>{
      this.Apiloading = false;
      this.loading = false;
    });
  }
  apply(){
      sessionStorage.setItem('casting_title',this.castingTitle);
      sessionStorage.setItem('casting_date',this.castingDate);
      this.route.navigate(['/apply-casting/'+this.castingId]);
  }
  bookmark(id:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
      .subscribe(res => {
        this.resData = res; 
        this.bmkStatus = this.resData.data[0];
        if(this.bmkStatus === 'Bookmark removed'){
          this.notifyService.showSuccess('Bookmark removed.','');
          this.bookmarks = 0;
        }else if(this.bmkStatus === 'Bookmark Added'){
          this.notifyService.showSuccess('Bookmark Added.','');
          this.bookmarks = 1;
        }     
      });
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Data saved successfully !!", "")
}

}
