import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-conve-update',
  templateUrl: './conve-update.component.html',
  styleUrls: ['./conve-update.component.css']
})
export class ConveUpdateComponent implements OnInit {
  URL = environment.api;
  datosConvenio :any = [];
  convenioId: any;
  entidades2:any = [];
  editarForm: any = new FormGroup({
    codigo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    objeto: new FormControl(''),
    entidades: new FormArray([]),
    firma: new FormControl(''),
    plazo: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { 


        // this.editarForm = this.fb.group({
        //   codigo: [this.datosConvenio.codigo, [Validators.required, Validators.minLength(3)]],
        //   nombre: ['', [Validators.required, Validators.minLength(3)]],
        //   objeto: [''],
        //   modificaciones: this.fb.array([
        //     this.fb.group({
        //       entidad: ['', [Validators.required]],
        //       monto: ['0', [Validators.required]]
        //     })
        //   ]),
        //   firma: [''],
        //   plazo: ['', [Validators.required]],
        // })
    
  }

  ngOnInit(): void {

    // this.getEntidades();
    this.convenioId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleConvenio(this.convenioId).subscribe(data => {
      this.datosConvenio = data;
      this.entidades2 = data.entidades;
      console.log("convenio", this.datosConvenio);
      
      if(this.datosConvenio.firma){
        this.editarForm.setValue({
          'codigo': this.datosConvenio.codigo,
          'nombre': this.datosConvenio.nombre,
          'objeto': this.datosConvenio.objeto,
          'entidades': [],
          'firma': this.datosConvenio.firma.substr(0, 10),
          'plazo': this.datosConvenio.plazo,
          // 'representante': this.datosConvenio.representante,
          // 'telefono': this.datosConvenio.telefono,
          // 'nit': this.datosConvenio.nit,
          // 'cuenta': this.datosConvenio.cuenta,
        });
      }else{
        this.editarForm.setValue({
          'codigo': this.datosConvenio.codigo,
          'nombre': this.datosConvenio.nombre,
          'objeto': this.datosConvenio.objeto,
          'entidades': [],
          'firma': this.datosConvenio.firma,
          'plazo': this.datosConvenio.plazo,
          // 'representante': this.datosConvenio.representante,
          // 'telefono': this.datosConvenio.telefono,
          // 'nit': this.datosConvenio.nit,
          // 'cuenta': this.datosConvenio.cuenta,
        });
      }

      
    })
    // console.log(this.datosConvenio)
    
  }



  editarConvenio(form:any){
    this.api.editarConvenio(form, this.convenioId).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log('HTTP Error', err)
      },
      () => {
        this.router.navigate(['convenio/convenio/index']),
          this.alertOk('success', 'Exito', 'Convenio editado Correctamente', '2000')
      }
    )

  }

  // getEntidades() {
  //   this.api.getAllEntidades().subscribe
  //     (res => {
  //       this.entidades2 = res;
  //       console.log(this.entidades2)
  //       // this.entidades.forEach((entidad:any) => {
  //       //   this.exampleData.push({id: entidad._id,
  //       //     text: entidad.nombre});
  //       // });

  //     });

  // }


  cancel(){
    this.router.navigate(['convenio/convenio/index'])
  }

  addEntidad() {
    // this.entidades.push(this.fb.control('', [Validators.required, Validators.minLength(3)]));
    const entidadFormGroup = this.fb.group({
      entidad: ['', [Validators.required]],
      monto: ['', [Validators.required]]
    });
    this.entidades.push(entidadFormGroup);
  }

  get entidades() {
    return this.editarForm.get('entidades') as FormArray;
  }

  removeEntidad(indice: number) {
    this.entidades.removeAt(indice);
  }

  get form() {
    return this.editarForm.controls;
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
