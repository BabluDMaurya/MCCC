import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TrainingService } from '../../_service/training.service';
import { Config } from '../../_config/config';

import { Location } from '@angular/common';
@Component({
  selector: 'app-training-inner',
  templateUrl: './training-inner.component.html',
  styleUrls: ['./training-inner.component.scss']
})
export class TrainingInnerComponent implements OnInit {
  @ViewChild("iframe") iframe: ElementRef | any;
  CategoryId: any;
  VideoId: any;
  loading: boolean= false;
  trainingVideo: any;
  vid: any;
  upNext: any;
  desc: any;
  expanded = 0;
  length: any;
  hostUrl:string = Config.Host+'backend2/';
  constructor(private actRoute:ActivatedRoute,
    private trainingService: TrainingService,
    private location:Location,) {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {  
      this.ngOnInit();
    });
   }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.CategoryId = params.get('type');
      this.VideoId = params.get('id');
      console.log(params );
      console.log( this.CategoryId );
      // this.ngOnInit();
    });

    this.trainingService.get_training_videos_by_id({'video_id':this.VideoId,'limit':''}).subscribe(res => {
      this.loading = true;
      
      if(res.data == 'No Data'){
        this.trainingVideo = [];
      }else{
        this.trainingVideo = res.data;
        this.vid = this.trainingVideo[0].video_url+'?autoplay=1&modestbranding=1&showinfo=0&amp';
        this.iframe.nativeElement.contentWindow.location.replace(this.vid);
        this.upNext = res.category_videos;
        this.desc = this.trainingVideo[0].description;
        this.length = this.desc.length;
        console.log(this.desc.length);
      }
     
      console.log(this.trainingVideo);
    },error=>{
      this.loading = false;
    });
  }

  back(){
    this.location.back()
  }
}
