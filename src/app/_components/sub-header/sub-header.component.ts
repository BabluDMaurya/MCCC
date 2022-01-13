import { Component, OnInit,Input } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  @Input() back : any; 
  link : any;
  constructor(private location:Location,) { }

  ngOnInit(): void {
    this.link = "/"+this.back;
  }
  backs(): void {
    // this.route.navigateByUrl('/casting-all/'+this.castingId);
    this.location.back();
    // window.history.back();
  }

}
