import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ListSliderI } from '../../../models/listSlider.interface';
import { environment } from '../../../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider-index',
  templateUrl: './slider-index.component.html',
  styleUrls: ['./slider-index.component.css']
})
export class SliderIndexComponent implements OnInit {
  sliders:ListSliderI[] = [];
  URL = environment.api;

  status =  false;
  
  constructor(
    private api: BlogService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.api.getAllSliders().subscribe(res => {
      this.sliders = res;
    });
  }
  
  editSlider(id:any){
    this.router.navigate(['blog/slider/update', id])
    // console.log(id);
  }

  addSlider(){
    this.router.navigate(['blog/slider/create'])
  }
}
