import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';

@Component({
  selector: 'app-thank-you-casting',
  templateUrl: './thank-you-casting.component.html',
  styleUrls: ['./thank-you-casting.component.scss']
})
export class ThankYouCastingComponent implements OnInit {

  applicationNo:any;
  constructor(private dashboardService:DashboardService,private route:Router,private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.applicationNo = params.get('application_no');
    });
  }
  letEx(){
    this.dashboardService.filter('applyed');
    this.route.navigate(['/home']);
  }

}
