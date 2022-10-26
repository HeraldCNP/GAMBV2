import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { borderRightStyle } from 'html2canvas/dist/types/css/property-descriptors/border-style';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-conve-create',
  templateUrl: './conve-create.component.html',
  styleUrls: ['./conve-create.component.css']
})
export class ConveCreateComponent implements OnInit {
  URL = environment.api;
  entidades2: any = [];

  example: any = [];

  convenioForm;








  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router
  ) {

    this.convenioForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      objeto: ['', [Validators.required, Validators.minLength(3)]],
      entidades: this.fb.array([
        this.fb.control('', [Validators.required, Validators.minLength(3)])
      ]),
      firma: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      plazo: ['', [Validators.required]],
      cuenta: ['',],
    })


    this.getEntidades();


  }
  
  get form(){
    return this.convenioForm.controls;
  }

  get entidades(){
    return this.convenioForm.get('entidades') as FormArray;
  }

  addEntidad(){
    this.entidades.push(this.fb.control('', [Validators.required, Validators.minLength(3)]));
  }



  ngOnInit() {
    
  }

  crearConvenio(form: any) {
    this.api.crearConvenio(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {

          this.router.navigate(['convenio/convenio/index']),
          this.alertOk('success', 'Exito', 'Convenio Creado Correctamente', '2000')
        }
      );
  }




getEntidades(){
  this.api.getAllEntidades().subscribe
    (res => {
      this.entidades2 = res;

      // this.entidades.forEach((entidad:any) => {
      //   this.exampleData.push({id: entidad._id,
      //     text: entidad.nombre});
      // });

    });

}

alertOk(icon: any, title: any, text: any, timer: any){
  Swal.fire({
    icon,
    title,
    text,
    timer
  })
}
}
