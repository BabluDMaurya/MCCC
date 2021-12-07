import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casting',
  templateUrl: './casting.component.html',
  styleUrls: ['./casting.component.scss']
})
export class CastingComponent implements OnInit {
  castingtab:any = 1;
  workshoptab:any = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
