import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';
import { Config } from 'src/app/_config/config';
declare var $: any;
@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss']
})
export class SidebarsComponent implements OnInit {
  currentUser: User;
  resData: any;
  data : any;
  baseUrl :string = Config.Host;
  profile_pic_path: any;

  constructor(
    private route:Router,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
    ) {this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    console.log(this.currentUser);
    this.dashboardService.userDetailsForPeofile()
        .subscribe(res => {
          this.resData = res;
          // this.profile_pic_path =  this.resData.profile_pic_path;
          this.data = this.resData.data.user_details;
          console.log(this.resData.data.user_details);
        });
  }
  logout(){
    this.authenticationService.logout();
    this.route.navigate(['/']);
  }
  sideBarClose(){
    $('.mat-typography').css('overflow','inherit');
  }

}
