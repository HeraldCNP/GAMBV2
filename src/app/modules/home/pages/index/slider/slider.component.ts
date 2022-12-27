import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  timerId:any;
  sliders:any = [];
  URL = environment.api;

  constructor(private api: HomeService) {
    
  }
  ngOnInit(): void {
    if(document.querySelector('#container-slider')){
      this.timerId = setInterval('funcionEjecutar("siguiente")',5000);
    }
    this.api.getAllSliders().subscribe(res => {
      this.sliders = res;
      console.log(this.sliders)
    });
  }
  ngOnDestroy():void{
    clearInterval(this.timerId)
  }


}
