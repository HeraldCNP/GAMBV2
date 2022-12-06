import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

import { NgxSelectModule } from 'ngx-select-ex';

declare function currencyInput(): void;
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
  convenio:any;
  convenioForm: any;
  finanForm: any;

  items: any[] = ["1", "2"];

  itemId: any = 3;

  showModal: boolean = true;
  texto = "";
  convenioId: any;
  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router
  ) {
    this.convenioForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      objeto: [''],
      // entidades: this.fb.array([
      //   this.fb.group({
      //     entidad: ['', [Validators.required]],
      //     monto: ['', [Validators.required]]
      //   })
      // ]),
      firma: [''],
      plazo: ['', [Validators.required]],
    });

    this.finanForm = this.fb.group({
      entidad: [''],
      monto: ['', [Validators.required]],
      tipo: ['', [Validators.required,]],
    })


    this.getEntidades();
  }

  get form() {
    return this.convenioForm.controls;
  }

  ngOnInit() {
    this.callCurrency()
  }

  //para llamar inputs type currency o moneda
  callCurrency() {
    setTimeout(function () {
      currencyInput()
      // console.log("Hola Mundo");
    }, 1000);
  }

  crearConvenio(form: any) {
    this.api.crearConvenio(form)
      .subscribe(
        res => {
          this.texto = res.serverResponse.nombre;
          this.convenioId = res.serverResponse._id;
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {

          this.convenioForm.reset();

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

  getConvenio(id:string){
    this.api.getSingleConvenio(id).subscribe
      (res => {
        this.convenio = res;
        console.log(this.convenio)
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

  cancel() {
    this.router.navigate(['convenio/convenio/index'])
  }

  show() {
    this.showModal = !this.showModal;

  }

  crearFinan(form: any) {
    console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.api.addfinanc(form, this.convenioId)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.finanForm.reset();
          this.getConvenio(this.convenioId)     
        }
      );
  }





  // get formEnt() {
  //   return this.convenioForm.controls.entidades.controls;
  // }

  // get entidades() {
  //   return this.convenioForm.get('entidades') as FormArray;
  // }


  // getRepresentante(id: any) {
  //   this.entidades2.forEach((entidad:any) => {
  //     let i = 0;
  //     if(entidad.text === id.target.value){
  //       this.entidades.controls[i].value.representante = entidad.representante.nombre + ' ' + entidad.representante.apellidos
  //       i++
  //     }
  //   });
  // }

  // addEntidad() {
  //   // this.entidades.push(this.fb.control('', [Validators.required, Validators.minLength(3)]));
  //   const entidadFormGroup = this.fb.group({
  //     entidad: ['', [Validators.required]],
  //     monto: ['', [Validators.required]]
  //   });
  //   this.entidades.push(entidadFormGroup);
  //   this.callCurrency()
  // }

  // removeEntidad(indice: number) {
  //   this.entidades.removeAt(indice);
  // }


}
