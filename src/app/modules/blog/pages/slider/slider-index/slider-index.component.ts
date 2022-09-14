import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ListSliderI } from '../../../models/listSlider.interface';
import { environment } from '../../../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.getSlider();
  }

  getSlider(){
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

  onDeleteSlider(id:any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'Su archivo ha sido eliminado.',
          'success'
        )
        this.api.deleteSlider(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getSlider() 
        );
      }
    })

    
  }
}
