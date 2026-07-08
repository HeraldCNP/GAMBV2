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
  entidadesData: any[] = [];
  montoTotal: any = 0;
  example: any = [];
  convenio: any;
  convenioForm: any;
  finanForm: any;
  finFecha: any;
  items: any[] = ["1", "2"];

  itemId: any = 3;

  showModal: boolean = true;
  showButton: boolean = false;
  texto = "";
  convenioId: any;


  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router
  ) {
    this.convenioForm = this.fb.group({
      convenio: ['Intergubernativo', [Validators.required]],
      codigo: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      objeto: ['', [Validators.required, Validators.minLength(3)]],
      // entidades: this.fb.array([
      //   this.fb.group({
      //     entidad: ['', [Validators.required]],
      //     monto: ['', [Validators.required]]
      //   })
      // ]),
      firma: [this.getFechaActual()],
      plazo: ['', ],
      fechafin:  ['' ],  // <-- aquí
      financiamiento: [false],
      conclusion:[false],
    });

    this.finanForm = this.fb.group({
      entidad: [''],
      monto: ['', [Validators.required]],
      tipo: ['', [Validators.required,]],
    })


    this.getEntidades();
    this.cargarEntidades();
  }

  get form() {
    return this.convenioForm.controls;
  }
ngOnInit() {
  this.callCurrency();

  this.convenioForm.get('firma')?.valueChanges.subscribe(() => {
    this.calcularFechaFin();
  });

  this.convenioForm.get('plazo')?.valueChanges.subscribe(() => {
    this.calcularFechaFin();
  });

  this.convenioForm.get('fechafin')?.valueChanges.subscribe(() => {
    this.calcularPlazo();
  });
}


  //para llamar inputs type currency o moneda
  callCurrency() {
    setTimeout(function () {
      currencyInput()
      // console.log("Hola Mundo");
    }, 1000);
  }

  getFechaActual(): string {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = ('0' + (hoy.getMonth() + 1)).slice(-2);
  const day = ('0' + hoy.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}


 calcularFechaFin() {
  const fechaFirma = this.convenioForm.get('firma')?.value;
  const plazoDias = Number(this.convenioForm.get('plazo')?.value);

  if (!fechaFirma || !plazoDias) return;

  const fecha = new Date(fechaFirma);
  fecha.setDate(fecha.getDate() + plazoDias);

  const year = fecha.getFullYear();
  const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
  const day = ('0' + fecha.getDate()).slice(-2);

  this.convenioForm.get('fechafin')?.setValue(`${year}-${month}-${day}`, { emitEvent: false });
}

calcularPlazo() {
  const fechaFirma = this.convenioForm.get('firma')?.value;
  const fechaFin = this.convenioForm.get('fechafin')?.value;

  if (!fechaFirma || !fechaFin) return;

  const inicio = new Date(fechaFirma);
  const fin = new Date(fechaFin);

  const diffTime = fin.getTime() - inicio.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  this.convenioForm.get('plazo')?.setValue(diffDays, { emitEvent: false });
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
          this.showButton = true;
          this.showModal = !this.showModal;
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
  cargarEntidades(params?: any) {
    params = params || { estado: true };
    this.api.queryEntidades(params).subscribe((data: any) => {
      console.log(data);
      this.entidadesData = data.entidades;
    });
  }

  getConvenio(id: string) {
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



  crearFinan(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
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
