import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EjecucionService } from '../../services/ejecucion.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-ejecucion-presupuestaria',
  templateUrl: './ejecucion-presupuestaria.component.html',
  styleUrls: ['./ejecucion-presupuestaria.component.css']
})
export class EjecucionPresupuestariaComponent {
  docEjecucion: any = [];
  gestion: any = [];
  auditoria: any;
  idDocEjecucion: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  editForm: any;
  addFileForm: any;
  files: any = [];
  progress: number = 0;
  docEjecucionId: any;

  private ejecucionService = inject(EjecucionService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.addForm = this.fb.group({
      gestion: [''],
      nombre: [''],
      // idUsuario: ['']
    });

    this.addFileForm = this.fb.group({
      documento: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
      // idUsuario: ['']
    });

    this.editForm = this.fb.group({
      gestion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      // idUsuario: ['']
    });

    this.gestion = [{
      2027: "2027",
      2026: "2026",
      2025: "2025",
      2024: "2024",
      2023: "2023",
      2022: "2022",
      2021: "2021",
      2020: "2020",
      2019: "2019",
      2018: "2018",
      2017: "2017",
      2016: "2016",
      2015: "2015",
      2014: "2014",
      2013: "2013",
    }]
    console.log(this.gestion);
  }

  ngOnInit(): void {
    this.getDocEjecucion();
    // this.getTipos();
  }



  get form2() {
    return this.addFileForm.controls;
  }

  getDocEjecucion() {
    this.ejecucionService.getAllDocEjecucion().subscribe
      (res => {
        this.docEjecucion = res;
        console.log('docs', this.docEjecucion)
      });
  }

  // getTipos() {
  //   this.ejecucionService.getAllTipos().subscribe
  //     (res => {
  //       this.tipos = res;
  //       console.log('modelos', this.tipos)
  //     });
  // }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.ejecucionService.changeEstadoDocNormativa(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getDocEjecucion();
        }
      );
  }

  changeStatus2(id: any, vigente: any) {
    let fd = new FormData();
    fd.append('vigente', vigente);
    console.log(vigente)
    this.ejecucionService.changeEstadoDocNormativa(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getDocEjecucion();
        }
      );
  }

  deleteEjecucion(id: string) {
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
          'El Documento ha sido eliminado.',
          'success'
        )
        this.ejecucionService.deleteEjecucion(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getDocEjecucion()
        );
      }
    })
  }

  get form() {
    return this.addForm.controls;
  }

  get form3() {
    return this.editForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  getId(id: string) {
    this.docEjecucionId = id;
  }

  crearEjecucion(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.ejecucionService.createEjecucion(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.addForm.reset();
        this.getDocEjecucion();
      }
    );
  }

  addArchivo() {
    let fd = new FormData();
    fd.append('documento', this.addFileForm.value.documento);
    fd.append('file', this.files[0]);
    this.ejecucionService.addArchivo(fd, this.docEjecucionId).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
      },
      (err) => {
        console.log('HTTP Error', err);
        this.progress = 0;
      },
      () => {
        this.progress = 0;
        this.getDocEjecucion();
        this.resetForm();
        this.alertOk(
          'success',
          'Exito',
          'Documento Creado Correctamente',
          '2000'
        );
      }
    );
  }

  resetForm() {
    this.addForm.reset();
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });

  }

  cargarDataEdit(documento: any) {
    // console.log("Rendi Edit", pei)

    this.editForm.setValue({
      gestion: documento.gestion,
      nombre: documento.nombre,
    });
    this.idDocEjecucion = documento._id;
  }

  editEjecucion() {
    let fd = new FormData();


      fd.append('gestion', this.editForm.value.gestion);
      fd.append('nombre', this.editForm.value.nombre);


    // let fd = new FormData();

    console.log(this.idDocEjecucion)

    this.ejecucionService.editarEjecucion(fd, this.idDocEjecucion).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        this.editForm.reset();
        this.alertOk(
          'success',
          'Exito',
          'Documento editado Correctamente',
          '2000'
        );
        this.getDocEjecucion();
      }
    );
  }

  borrarArchivo(id: any) {
    // console.log(id);
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
          'El Documento ha sido eliminado.',
          'success'
        )
        this.ejecucionService.deleteDocEjecucion(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getDocEjecucion()
        );
      }
    })
  }
}
