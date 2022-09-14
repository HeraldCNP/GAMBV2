import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slider-update',
  templateUrl: './slider-update.component.html',
  styleUrls: ['./slider-update.component.css']
})
export class SliderUpdateComponent implements OnInit {
  files:any = '';
  URL = environment.api;
  datosSlider :any;
  sliderId: any;
  editarForm:any = new FormGroup({
    titulo: new FormControl(''),
    detalle: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private activeRouter: ActivatedRoute, private router: Router, private api:BlogService) { }

  ngOnInit(): void {
    this.sliderId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleSlider(this.sliderId).subscribe(data => {
      // console.log(data.serverResponse);
      this.datosSlider = data.serverResponse;
      this.editarForm.setValue({
        'titulo': this.datosSlider.titulo,
        'detalle': this.datosSlider.detalle,
        'image': this.datosSlider.urislaider,
      });
      
    })
  }

  editFormSlider(){
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    
    
    if(typeof(this.files[0]) == 'object'){
      fd.append('image', this.files[0]);
      fd.append('titulo', this.editarForm.value.titulo);
      fd.append('detalle', this.editarForm.value.detalle);
    }else{
      fd.append('titulo', this.editarForm.value.titulo);
      fd.append('detalle', this.editarForm.value.detalle);
      fd.append('image', this.editarForm.value.image);
    }
    
    this.api.sendUpdateSlider(fd, this.sliderId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['blog/slider/index']),
        this.alertOk('success', 'Exito', 'Slider Editado Correctamente', '1500')
      }
    );
    
  }


  onChange($event:any) {
    this.files = $event.target.files;
  }
  alertOk(icon:any, title:any, text:any, timer:any){
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

}
