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
  public countryList:{id:number, name:string, code:string}[] = countries;
  public selectedCountry = 'India';
  @Input() parent: FormGroup | any;
  @Input() submit: any;
  cityList : any;
  stateList : any;  
  selectedState = 'Select';
  selectedCity = 'Select';
  response : any;
  dataTrue = false;  
  all_countries : any = [];
  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {        
    this.parent.addControl('country',new FormControl('101', [Validators.required]));     
      this.parent.addControl('state',new FormControl('',[Validators.required]));
      this.parent.addControl('city',new FormControl('', [Validators.required]));
      this.registerService.states({country_id:101}).subscribe(res=>{
        this.response = res;
        if(this.response.data !== 'undefined' && this.response.data.length > 0){
          this.stateList = this.response.data;  
        }else{          
          this.dataTrue = false;
        }
      },error=>{
       
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.parent.controls;
  }
  changeSuitState(e:any) {
    console.log("changeSuitState:", e);
    if(e.target.value > 0){      
      this.registerService.states({country_id:e.target.value}).subscribe(res=>{
        this.response = res;
        if(this.response.data !== 'undefined' && this.response.data.length > 0){
          this.stateList = this.response.data;  
        }else{          
          this.dataTrue = false;
        }
      },error=>{
       
      });
    }
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
