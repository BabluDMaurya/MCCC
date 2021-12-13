import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Config } from '../_config/config';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  headers:any;
  localstorageData : any;
  currentUser : any;
  token : any;
  public options: any;

  constructor(private https: HttpClient) { }
  get_training_categories(){
    return this.https.post<any>(Config.BasePath +'/get_training_categories','');
  }

  get_training_videos(data:any){
    return this.https.post<any>(Config.BasePath +'/get_training_videos',data);
  }

  get_training_videos_by_id(data:any){
    return this.https.post<any>(Config.BasePath +'/get_training_videos_by_id',data);
  }
}
