import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-success',
  templateUrl: './final-success.component.html',
  styleUrls: ['./final-success.component.scss']
})
export class FinalSuccessComponent implements OnInit {
  back_link :any =  "signin";
  component_title : string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
