import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/_service/register.service';
import countries from '../../_files/countries.json';

@Component({
  selector: 'app-your-country-state-city',
  templateUrl: './your-country-state-city.component.html',
  styleUrls: ['./your-country-state-city.component.scss']
})
export class YourCountryStateCityComponent implements OnInit {

  title = 'json-file-read-angular';
  public countryList:{name:string, code:string}[] = countries;

  @Input() parent: FormGroup | any;
  @Input() submit: any;
  cityList : any;
  stateList : any [] = []; 
  selectedCountry = 'Select';  
  selectedState = 'Select';
  selectedCity = 'Select';
  response : any;
  dataTrue = false;
  
  all_countries : any = [];
  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {        
    this.parent.addControl('country',new FormControl('', [Validators.required]));     
      this.parent.addControl('state',new FormControl('',[Validators.required]));
      this.parent.addControl('city',new FormControl('', [Validators.required])); 

      //-fetch all the cities
    this.registerService.countries().subscribe(
      data => {        
        this.all_countries = data;
        console.log("countries : ", this.all_countries);
      },error => {
        console.log("terms error");
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.parent.controls;
  }
  changeSuit(e:any) {
    if(e.target.value > 0){      
      this.registerService.cities({state_id:e.target.value}).subscribe(res=>{
        this.response = res;
        if(this.response.data !== 'undefined' && this.response.data.length > 0){
          this.cityList = this.response.data;  
        }else{          
          this.dataTrue = false;
        }
      },error=>{
       
      });
    }
  }

}
