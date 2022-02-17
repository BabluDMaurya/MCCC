import { Component, OnInit,Input, } from '@angular/core';
// import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';
import { Config } from 'src/app/_config/config';
import {BdcWalkService} from 'bdc-walkthrough';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  getCount: any;
  resData: any;
  data : any;
  baseUrl :string = Config.Host;
  profile_pic_path: any;
  profile_pic: any;
  constructor(
    private route:Router,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService,
    private bdcWalkService: BdcWalkService
  ) {
    
   }
  @Input() castingtab : any;
  @Input() moviesTab : any;
  @Input() tab : any;
  @Input() workshoptab : any;

   
  ngOnInit(): void {
    this.getUserNotificationCounter();
    setInterval(() => { 
     this.getUserNotificationCounter();
    }, 10000 * 15)

    this.dashboardService.userDetailsForPeofile()
        .subscribe(res => {
          this.resData = res;
          this.profile_pic_path =  this.resData.data.user_details.profile_pic_path;
          this.profile_pic =  this.resData.data.user_details.profile_pic;

          this.data = this.resData.data.user_details;
          // console.log(this.resData.data.user_details);
        });

        // $('.clickClass').on('click',function(){
          
        // });
  }
  getUserNotificationCounter(){
    this.dashboardService.getUserNotificationCounter(null)
    .subscribe(res => {
      this.getCount = res.data; 
      // console.log(this.getCount + 'count');
    });
  }
  addExternalClass(){
    $('.ng-tns-c95-7').addClass('PGJA2');
    if($('.ng-tns-c95-7').hasClass('PGJA2')){
      $('.cdk-overlay-pane').addClass('training_tour_pane');
    }
    $('.box.movies a').hasClass()

    // $('.mat-menu-trigger').on('click',function () {
    //   var position = $(this).position();
    //   var corresponding = $(this).data("id");
  
    //   // scroll to clicked tab with a little gap left to show previous tabs
    //   // eslint-disable-next-line no-restricted-globals
    //   scroll = $('.tabs').scrollLeft();
    //   // console.log(scroll);
    //   $('.tabs').animate({
    //     // eslint-disable-next-line no-restricted-globals
    //       'scrollLeft': scroll + position.left - 30
    //   }, 200);
    // })

    
    $('.ng-tns-c95-8').addClass('moviesss');
    if($('.ng-tns-c95-8').hasClass('movies')){
      $('.cdk-overlay-pane').addClass('movies_tour_pane');
    }
  }

  ngAfterViewChecked(){
    this.addExternalClass();
  }
  // clickClass(){
  //   $('.mccc').addClass('popUpClass');
  // }
}
