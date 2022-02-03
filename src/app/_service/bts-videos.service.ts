import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../_config/config';

@Injectable({
  providedIn: 'root'
})
export class BtsVideosService {
  constructor(private http: HttpClient) { }
  get_bts_videos(data:any){
    return this.http.post<any>(Config.BasePath +'/get_bts_videos',data);
  }
  load_bts_videos(){
    return this.http.post<any>(Config.BasePath +'/load_bts_videos','');
  }
  load_next_bts_videos(data:any){
    return this.http.post<any>(Config.BasePath +'/load_next_bts_videos',data);
  }
  bts_videos_by_id(data:any){
    return this.http.post<any>(Config.BasePath +'/bts_videos_by_id',data);
    
  }
  bts_videos_cat_by_id(data:any){
    return this.http.post<any>(Config.BasePath +'/bts_videos_cat_by_id',data);
  }
  views_count_update(data:any){
    return this.http.post<any>(Config.BasePath +'/views_count',data);
  }

  get_categories(){
    return this.http.post<any>(Config.BasePath +'/get_categories','');
  }
 
}
