import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service'; 
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.scss']
})
export class NoInternetComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;

  constructor(private connectionService: ConnectionService,
    private route:Router,
    private location: Location,) {}
    ngOnInit(): void {
    }
    checkInternet(){       
      this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = isConnected; 
        if (this.isConnected) { 
          this.status = "ONLINE";
          this.location.back();
        }  
        else {         
          this.status = "OFFLINE";
          this.route.navigate(['/no-internet']);
        }  
      });      
      }
}
