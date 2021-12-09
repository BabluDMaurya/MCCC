import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-top-header-btl',
  templateUrl: './top-header-btl.component.html',
  styleUrls: ['./top-header-btl.component.scss']
})
export class TopHeaderBtlComponent implements OnInit {

  @Input() back : any; 
  @Input() title : any;
  link : any;
  constructor() {}

  ngOnInit(): void {
    this.link = "/"+this.back;
  }

}
