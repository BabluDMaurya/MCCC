import { Component, OnInit } from '@angular/core';
import {BtsVideosService} from '../_service/bts-videos.service';
import { Config } from '../_config/config';
import '../../assets/js/main.js'
@Component({
  selector: 'app-bts',
  templateUrl: './bts.component.html',
  styleUrls: ['./bts.component.scss']
})
export class BtsComponent implements OnInit {
  loadingtopbts : boolean = false;
  component_title = 'BTS';
  stickymenu = 'bts';
  constructor(private btsVideosService: BtsVideosService,) { }
  videoNotFound :boolean =false;
  expanded = 0;
  btsCategoryId: any;
  loadMoreButton :boolean = false;
  videosdata:any = []; 
  displayData:any = []; 


  loadData: any = false;
  popularBtsVideos : any;
  topBtsVideos: any;
  topBTSV :boolean = false;
  popularBTSV :boolean = false;
  watchmoreBTSV :boolean = false;
  categories : any;
  // offset:any = 0;
  hostUrl:string = Config.Host+'backend2/';
  category_color: any = ['hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)','hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)'];
 //-----slick slider------------//    
 slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": true,};
 trns_sliders = {"slidesToShow": 4, "slidesToScroll": 4,"dots": false,"infinite": false};
 // addSlide() {
 //   this.slides.push({img: "http://placehold.it/350x150/777777"})
 // }    
 // removeSlide() {
 //   this.slides.length = this.slides.length - 1;
 // }    
 slickInit(e:any) {
   // console.log('slick initialized');
 }    
 breakpoint(e:any) {
   // console.log('breakpoint');
 }    
 afterChange(e:any) {
   // console.log('afterChange');
 }    
 beforeChange(e:any) {
   // console.log('beforeChange');
 } 
  ngOnInit(): void {    
              // this.btsVideosService.get_bts_videos({'limit': 10,'category_id':1}).subscribe(
              //     data => { 
              //         this.popularBtsVideos = data.data;
              //         this.loadData = true;
              //         this.popularBTSV = true;
              //     },error=>{
              //       this.popularBTSV = false;
              //     });
              // this.btsVideosService.get_bts_videos({'limit': 10,'category_id':2}).subscribe(
              //     data => { 
              //       this.loadData = true;
              //       if(data.data.length > 0){
              //         this.topBTSV = true;
              //         this.loadingtopbts = true;
              //         // console.log(data.data);
              //         this.topBtsVideos = data.data;
              //       }else{
              //         this.topBTSV = false;
              //         this.loadingtopbts = false;
              //       }
              //     });
              this.btsVideosService.load_bts_videos()
              .subscribe(
                    data => { 
                        console.log(data.data);
                        this.topBtsVideos = data.data;
                        this.videosdata = data.data;
                        let newLength = this.displayData.length + 10;
                        if (newLength > this.videosdata.length) {
                            newLength = this.videosdata.length;
                        }
                        this.displayData = this.videosdata.slice(0, newLength);
                        if (newLength < this.videosdata.length) {
                            this.loadMoreButton = true;
                        }else{
                          this.loadMoreButton = false;
                        }
                        // this.offset = 10 + data.offset;
                        // console.log("topBtsVideos : " , this.topBtsVideos);
                        // console.log("this.offset : " , this.offset);
                        this.loadData = true;
                        if(this.topBtsVideos.length > 0 ){    
                          this.videoNotFound = false;
                        }else{
                          this.videoNotFound = true;
                        }

                        this.btsVideosService.get_categories().subscribe(
                          data => { 
                              this.categories = data.data;
                              console.log(this.categories);
                              this.loadData = true;
                              this.watchmoreBTSV = true;
                          },error=>{
                            this.watchmoreBTSV = false;
                          });
                    }); 

                            
  }
  loadmore(){
    let newLength;
    if(this.videosdata.length >= this.displayData.length + 10){
      newLength= this.displayData.length + 5;
    }else{
      let newLengthadd = this.videosdata.length - this.displayData.length;
      newLength = this.displayData.length + newLengthadd;
    }
    if (newLength > this.videosdata.length) {
        newLength = this.videosdata.length;
    }
     this.displayData = this.videosdata.slice(0, newLength);
     if (newLength < this.videosdata.length) {
        this.loadMoreButton = true;
     }else{
        this.loadMoreButton = false;
     }
  }
  isOdd(n:number) {
    return Math.abs(n % 2) == 1;
 }
 videoClick(id: any){
  console.log(id);
  this.btsVideosService.views_count_update({'video_id': id})
            .subscribe(
                  data => { 
                      console.log(data);
                      
                     
                  }); 
}
}