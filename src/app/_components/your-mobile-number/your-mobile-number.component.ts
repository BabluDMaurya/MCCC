import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-mobile-number',
  templateUrl: './your-mobile-number.component.html',
  styleUrls: ['./your-mobile-number.component.scss']
})
export class YourMobileNumberComponent implements OnInit {
  @Input() parent: FormGroup | any;
  @Input() submit: any;
  codeList: any = ['+91', '+101', '+21'];
  selectedCode = '+91';
  constructor() { }
  ngOnInit(): void {        
    this.parent.addControl('phone',new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ));
      this.parent.addControl('country_code',new FormControl('', Validators.required,
      ));
  }
  get f(): { [key: string]: AbstractControl } {
    return this.parent.controls;
  }  
}
