import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-of-birth',
  templateUrl: './date-of-birth.component.html',
  styleUrls: ['./date-of-birth.component.scss']
})
export class DateOfBirthComponent implements OnInit {

  @Input() parent: FormGroup | any;
  @Input() submit: any;
  dayList: any = ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  monthList: any = ['1', '2', '3','4','5','6','7','8','9','10','11','12'];
  yearList: any = ['1986', '1987', '1988','1989','1990','1991','1992','1993'];
  constructor() { } 
  ngOnInit(): void {        
    this.parent.addControl('day',new FormControl('', Validators.required));     
      this.parent.addControl('month',new FormControl('',Validators.required));
      this.parent.addControl('year',new FormControl('', Validators.required)); 
  }
  get f(): { [key: string]: AbstractControl } {
    return this.parent.controls;
  }

}
