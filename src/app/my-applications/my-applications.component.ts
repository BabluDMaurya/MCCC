import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_service/dashboard.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
  back_link :any =  "home";
  applications:any = [];
  resData:any;
  loading = false;
  noData:boolean = true;

  constructor(private dashboardService : DashboardService) { 
    this.dashboardService.listen().subscribe((e:any)=>{
      this.getMyApplication();
    });
  }
  getMyApplication(){
    this.dashboardService.myApplication(null)
    .subscribe(
        res => {
          this.loading=true;
          this.noData = true;
          this.resData = res;        
        this.applications = this.resData.data; 
        console.log("My app :",this.applications.length);
        if(this.applications.length > 0){
          console.log("this.applications.length :   " + this.applications.length);
          this.noData = true;
        }else{
          this.noData = false;
          console.log("this.applications.length else :   " + this.applications.length);
        }

        },
        error => {
          this.loading=true;
        });
  }

  ngOnInit(): void {
    this.getMyApplication();
  }

}
