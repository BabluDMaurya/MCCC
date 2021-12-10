import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {WorkshopService} from '../../_service/workshop.service';
@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.scss']
})
export class WorkshopCardComponent implements OnInit {
  @Input() data:any;
  upcomingData: any;
  loading = false;
  endingsoonData: any;
  previosData: any;
  expanded = 0;
  workshsopData: any;
  eventForYouData: any;
  onGoingData: any;
  upcoming: any;
  constructor(private workshopService: WorkshopService,
    private route : Router,
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.workshopService.get_all_workshop_data('').subscribe(
      data => { 
        // this.workshsopData = data.data;
        // this.eventForYouData = this.workshsopData.event_for_u;
        // this.onGoingData = this.workshsopData.on_going;
        // this.upcoming = this.workshsopData.upcoming;
        // this.loading = true;
        if(this.upcomingData == 'No Data'){
          this.upcomingData = [];
        }
        console.log(this.upcomingData);
    });
  }
  doHtmlDisplay(text:any, limit = 50) {
    if (text.length > limit) {
     text = text.substring(0, limit) + '...<span>View More</span>';
    } else {
     text;
    }
    return text;
   }
   workshopInner(id:any){
    this.route.navigate(['workshop-registration',id]);
  }

}
