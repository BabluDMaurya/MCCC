import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import mobile_code from '../../_files/mobile_code.json';

@Component({
  selector: 'app-your-mobile-number',
  templateUrl: './your-mobile-number.component.html',
  styleUrls: ['./your-mobile-number.component.scss']
})
export class YourMobileNumberComponent implements OnInit {
  public codeList:{id:number, name:string,mobileCountryCode:string}[] = mobile_code;
  // public countryList:{id:number, name:string, code:string}[] = countries;
  @Input() parent: FormGroup | any;
  @Input() submit: any;
  selectedCode = '+91';
  constructor() { }
  ngOnInit(): void {        
    this.parent.addControl('phone',new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern("^[0-9]*$")],
      ));
      this.parent.addControl('country_code',new FormControl('', Validators.required,
      ));
  }
  get f(): { [key: string]: AbstractControl } {
    return this.parent.controls;
  }  
}
