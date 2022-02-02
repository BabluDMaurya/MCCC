import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header-bt',
  templateUrl: './top-header-bt.component.html',
  styleUrls: ['./top-header-bt.component.scss']
})
export class TopHeaderBTComponent implements OnInit {

  @Input() back : any; 
  @Input() title : any;
  link : any;
  constructor() {}

  ngOnInit(): void {    
    this.link = "/"+this.back;
  }

}
