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
  datosConvenio: any = [];
  convenioId: any;
  entidades2: any = [];
  idFinan: any;
  convenio: any;
  finanForm: any;
  entidadesData: any[] = [];
  showModal: boolean = true;
  editarForm: any = new FormGroup({
    convenio: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    objeto: new FormControl(''),
    entidades: new FormArray([]),
    firma: new FormControl(''),
    plazo: new FormControl(''),
    fechafin: new FormControl(''),
    financiamiento: new FormControl(),
    conclusion: new FormControl(),
  })

  editarFinan: any = new FormGroup({
    monto: new FormControl(''),
    entidad: new FormControl(''),
    tipo: new FormControl(''),
  })

  editarMonto: any = new FormGroup({
    monto: new FormControl('', Validators.required),
  })

  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.cargarEntidades();

    // Cuando cambia la fecha de firma o el plazo → recalcular fecha fin
    this.editarForm.get('firma')?.valueChanges.subscribe(() => {
      this.calcularFechaFin();
    });

    this.editarForm.get('plazo')?.valueChanges.subscribe(() => {
      this.calcularFechaFin();
    });

    // Cuando cambia fecha fin → recalcular plazo
    this.editarForm.get('fechafin')?.valueChanges.subscribe(() => {
      this.calcularPlazo();
    });

    // this.getEntidades();
    this.convenioId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleConvenio(this.convenioId).subscribe(data => {
      this.datosConvenio = data;
      this.entidades2 = data.entidades;
      console.log("convenio", this.datosConvenio);

      if (this.datosConvenio.firma) {
        this.editarForm.setValue({
          'convenio': this.datosConvenio.convenio || '',
          'codigo': this.datosConvenio.codigo || '',
          'nombre': this.datosConvenio.nombre || '',
          'objeto': this.datosConvenio.objeto || '',
          'entidades': [],
          'firma': this.datosConvenio.firma.substr(0, 10),
          'plazo': this.datosConvenio.plazo,
          'fechafin': this.datosConvenio.fechafin ? this.datosConvenio.fechafin.substr(0, 10) : '',
          'financiamiento': this.datosConvenio.financiamiento,
          'conclusion': this.datosConvenio.conclusion,
        });
      } else {
        this.editarForm.setValue({
          'convenio': this.datosConvenio.convenio || '',
          'codigo': this.datosConvenio.codigo || '',
          'nombre': this.datosConvenio.nombre || '',
          'objeto': this.datosConvenio.objeto || '',
          'entidades': [],
          'firma': this.datosConvenio.firma,
          'plazo': this.datosConvenio.plazo,
          'fechafin': this.datosConvenio.fechafin ? this.datosConvenio.fechafin.substr(0, 10) : '',
          'financiamiento': this.datosConvenio.financiamiento,
          'conclusion': this.datosConvenio.conclusion,
        });
      }

    })
    // console.log(this.datosConvenio)

  }

  calcularFechaFin() {
    const firma = this.editarForm.get('firma')?.value;
    const plazo = Number(this.editarForm.get('plazo')?.value);

    if (!firma || !plazo) return;

    const fecha = new Date(firma);
    fecha.setDate(fecha.getDate() + plazo);

    const y = fecha.getFullYear();
    const m = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const d = ('0' + fecha.getDate()).slice(-2);

    this.editarForm.get('fechafin')?.setValue(`${y}-${m}-${d}`, { emitEvent: false });
  }

  calcularPlazo() {
    const firma = this.editarForm.get('firma')?.value;
    const fin = this.editarForm.get('fechafin')?.value;

    if (!firma || !fin) return;

    const f1 = new Date(firma);
    const f2 = new Date(fin);

    const diffTime = f2.getTime() - f1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.editarForm.get('plazo')?.setValue(diffDays, { emitEvent: false });
  }

  editarConvenio(form: any) {
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

  editMonto(id: string, monto: any) {
    console.log(id)
    console.log(monto)
    this.editarMonto.setValue({
      'monto': monto,

    })
    this.idFinan = id;

  }

  editFinan(form: any) {
    this.api.editarFinan(form, this.idFinan).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log('HTTP Error', err)
      },
      () => {
        this.router.navigate(['convenio/convenio/index']),
          this.alertOk('success', 'Exito', 'Monto editado Correctamente', '2000')
      }
    )
  }

  cargarEntidades(params?: any) {
    params = params || { estado: true };
    this.api.queryEntidades(params).subscribe((data: any) => {
      console.log(data);
      this.entidadesData = data.entidades;
    });
  }
  crearFinan(form: any) {
    console.log('form',form);
    
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.api.addfinanc(form, this.convenioId)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getConvenio(this.convenioId)
          this.editarFinan.reset();
        }
      );
  }

  getConvenio(id: string) {
    this.api.getSingleConvenio(id).subscribe
      (res => {
        this.convenio = res;
        this.datosConvenio = res;
        console.log(this.convenio)
      });
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


  cancel() {
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
