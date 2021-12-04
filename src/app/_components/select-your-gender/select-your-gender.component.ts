import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-your-gender',
  templateUrl: './select-your-gender.component.html',
  styleUrls: ['./select-your-gender.component.scss']
})
export class SelectYourGenderComponent implements OnInit {
    @Input() parent: FormGroup | any;
    @Input() submit: any;
    genderList = ['Female', 'Male', 'Transgender', 'Genderqueer'];
  constructor() { }

  ngOnInit(): void {    
  this.parent.addControl('gender',new FormControl('', Validators.required,
  ));
}
get f(): { [key: string]: AbstractControl } {
return this.parent.controls;
}

}
