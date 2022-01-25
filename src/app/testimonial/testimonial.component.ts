import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_service/common.service';
import { Config } from 'src/app/_config/config';
declare var $: any;
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  back_link:any;
  disableArrow:boolean = false;
  baseUrl :string = Config.Host;
  imgPath="../../assets/img/img/arrow_left.png'";
  prevtButton = '<div class="testimonials_arrows"><span class="slick-next"><img src="../../assets/img/img/arrow_left.png"/></span></div>';
  nextButton = '<div class="testimonials_arrows"><span class="slick-prev"><img src="../../assets/img/img/arrow_left.png"/></span></div>';
  slides = [
    {"no": 1,img: "../../assets/img/img/testimonial_pic1.png",name:"Anurag Kashyap",shortdes:"Director of Gangs Of Wasseypur, Ugly, Bombay Velvet",des:'"For me 50% of my film is made if it`s cast right...but its difficult to find a casting director with that eye for detail and someone who works closely with actors to turn them into characters, that fit the call. Mukesh is someone i discovered through Chillar Party. I found the casting in that film was spot on and i wanted to know who has done it. After meeting him, he has been a permanent fixture of our productions..so much so that we operate from the same premises."'},
    {"no": 2,img: "../../assets/img/img/testimonial_pic1.png",name:"Raj Kumar Hirani",shortdes:"Director of Lage Raho Munna bhai, 3 Idiots, pk",des:'"To find the right actor to play a character, big or small requires, one, immense understanding of the script and two, a keen eye to find an artist who has the ability to portray the character that he is to play. Having worked with Mukesh Chhabra, it has made me realize that he not only has an eye for talent but also the patience and commitment, required to ease the casting worry of a Director. Mukesh stands by you, takes his work seriously, to the extent that he even creates a set like environment for all his auditions, putting props, getting right costume, giving the actor a look and sometimes even back ground music . He ensures that even the surroundings play its role in getting the actor into character, thus raising the standard of his audition to a superior quality. I enjoy working with him."'},
    {"no": 3,img: "../../assets/img/img/testimonial_pic1.png",name:"Imtiaz Ali",shortdes:"Director of Love Aaj Kal, Rockstar, Tamasha",des:'"Mukesh Chhabra has opened our eyes to what good casting can do to a film. It is because if him that casting is a serious department in Hindi movies today. He has also unearthed fantastic actors who might have otherwise faded away. I see Mukesh`s effort as a big service to the world of performance. Personally, he has brought a lot of value to my films and I thank him for that. Best wishes to you Mukesh, a lot depends on you. ."'},
    {"no": 4,img: "../../assets/img/img/GirlImg.webp",name:"Tigmanshu Dhulia",shortdes:"Director of Sahib Biwi Gangster, Sahib Biwi Gangster Returns",des:'"Mukesh chhabra has taken the art of casting direction to a very respectable and creative level he understands the director and the space of the script with great precision ."'},
  
    {"no": 5,img: "../../assets/img/img/testimonial_pic1.png",name:"Vikas Bahl",shortdes:"Director of Chillar Party, Queen, Shaandar",des:'"Mukesh is not a Casting Director.He is the guy who brings your Film alive.He is your partner in crime from 1st day till eventuality.I am glad i met my partner Mukesh Chhabra from my first Film itself. ."'},
    {"no": 6,img: "../../assets/img/img/testimonial_pic1.png",name:"Abhishek Kapoor",shortdes:"Director of Rock On, Kai Po Che, Fitoor",des:'"Working with Mukesh chhabra has been a revelation for me. His understanding of characters and relentless quest for perfect casting has been most crucial for "kai po che." In a lopsided industry where the stars dictate, Mukesh is the man who can help a film maker rise above the buckling pressure of the star system and deliver a pure vision. He is a priceless asset. "'},
    {"no": 7,img: "../../assets/img/img/testimonial_pic1.png",name:"Nishikant Kamat",shortdes:"Director of Force, Madari, Rocky Handsome",des:'"Mukesh Chabra as a casting director has been a revelation. His sense of understanding the script and the characters is immaculate. A lot of credit for films like Chillar Party, Gangs of Waseypur to be successful definitely goes to superb casting apart from the fact that they are wonderful films. Mukesh has made many of us dependent on him for correct casting. We as filmmakers at times are not aware of the constant in flow of wonderful talent in this industry,but with Mukesh around we all can rely on him without hesitation. His energy and hunger for perfect casting is commendable and his eye for fresh talent is unbelievable. Way to go Mukesh."'},
    {"no": 8,img: "../../assets/img/img/GirlImg.webp",name:"Nikhil Advani",shortdes:"Director of Kal Ho Na Ho, D-Day, Katti Batti",des:'"When a casting director understands the pressure of nailing a particular character but, still prefers not to compromise or just give in you know you have hit upon the right guy. Mukesh works for the film! Relentless and unwavering, he likes to push not only the various options that he feels will work for the character, but also himself and his team. He encourages them to think out of the box so that the suggestions and options look refreshing and very different. He likes to suprise not shock and that is a very key component of the casting process. ."'},
    
    {"no": 9,img: "../../assets/img/img/testimonial_pic1.png",name:"Hansal Mehta",shortdes:"Director of Shahid, City Lights",des:'"Honestly, I had no idea that casting directors made such a huge difference to filmmaking until I met Mukesh. I thought I did a decent job of casting in some of my earlier films. But today I am in the midst of completing what I believe is my most honest work to date – and credit for helping me retain that honesty throughout the making of ‘Shahid’ goes to the stellar cast put together by Mukesh. He argued, fought and at times made many independent decisions – all of them benefitted the film immensely. Attention to character, performance and a unique audition style make Mukesh a truly special casting director. Thank you Mukesh Chhabra. Because of you I am now living an entirely new life as a filmmaker."'},
    {"no": 10,img: "../../assets/img/img/testimonial_pic1.png",name:"Vishal Bhardwaj",shortdes:"Director of Omkara, Maqbool, Haider",des:'"Mukesh Chhabra is the kind of casting director that gets emotionally involved and invested in the project he takes up. He will be so passionate about getting the right actor for the right role that his enthusiasm will only equate that of the director. With his incredibly resourceful team he will make sure no stone is unturned in search of the perfect casting for each and every role in the film. `Haider` would not have been what it turned out to be if it hadn`t been for the wonderful actors that Mukesh and his team lined up for me."'},
    {"no": 11,img: "../../assets/img/img/testimonial_pic1.png",name:"Kabir Khan",shortdes:"Director of New York, Ek Tha Tiger, Bajrangi Bhaijaan",des:'"Over the years I have admired the casting that Mukesh had done for various films. Bajrangi Bhaijaan has a varied palette of characters & so naturally my first choice for the casting director was Mukesh. If my characters have come alive in the film then a large part of the credit for that goes to Mukesh for getting the correct actors to portray those characters."'},
    
  ];
  two_sliders = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,"infinite": false,"fade":true,'nextArrow':this.prevtButton,'prevArrow':this.nextButton,};
  loading:boolean = true;
  resData:any;
  testimonilas :any;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.loading = false;
    this.commonService.getTestimonials().subscribe(res => {
      this.loading = true;
      this.resData = res;         
      this.testimonilas = this.resData.data.testimonials;
    },error=>{
      this.loading = false;
    });
  }
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
}
