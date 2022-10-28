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
  montoTotal: any = 0;
  example: any = [];

  convenioForm;

  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router
  ) {

    this.convenioForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      objeto: [''],
      entidades: this.fb.array([
        // this.fb.group({
        //   entidad: ['', [Validators.required]],
        //   representante:[''],
        //   monto: ['0', [Validators.required]]
        // })
      ]),
      firma: ['', [Validators.required]],
      plazo: ['', [Validators.required]],
    })


    this.getEntidades();
  }

  get form() {
    return this.convenioForm.controls;
  }
  // get formEnt() {
  //   return this.convenioForm.controls.entidades.controls;
  // }

  get entidades() {
    return this.convenioForm.get('entidades') as FormArray;
  }


  // getRepresentante(id: any) {
  //   this.entidades2.forEach((entidad:any) => {
  //     let i = 0;
  //     if(entidad.text === id.target.value){
  //       this.entidades.controls[i].value.representante = entidad.representante.nombre + ' ' + entidad.representante.apellidos
  //       i++
  //     }
  //   });
  // }

  addEntidad() {
    // this.entidades.push(this.fb.control('', [Validators.required, Validators.minLength(3)]));
    const entidadFormGroup = this.fb.group({
      entidad: ['', [Validators.required]],
      representante: [''],
      monto: ['', [Validators.required]]
    });
    this.entidades.push(entidadFormGroup);
  }

  removeEntidad(indice: number) {
    this.entidades.removeAt(indice);
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




  getEntidades() {
    this.api.getAllEntidades().subscribe
      (res => {
        this.entidades2 = res;
        console.log(this.entidades2)
        // this.entidades.forEach((entidad:any) => {
        //   this.exampleData.push({id: entidad._id,
        //     text: entidad.nombre});
        // });

      });

  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }
}
