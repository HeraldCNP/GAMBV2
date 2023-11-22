import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PrestamosService } from '../../../services/prestamos.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-prestamos-index',
  templateUrl: './prestamos-index.component.html',
  styleUrls: ['./prestamos-index.component.css']
})
export class PrestamosIndexComponent {
  prestamos: any = [];
  // tipos: any = [];
  idPrestamo: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  addFileForm: any;
  editForm: any;
  files: any = [];
  progress: number = 0;
  prestamoId: any;
  prestamoSingle: any;


  tipos = [
    {
      "name": "Crédito",
      "slug": "credito",
    },
    {
      "name": "Fideicomiso",
      "slug": "fideicomiso",
    }
  ]

  tipos2 = [
    {
      "name": "Contrato",
      "slug": "contrato",
    },
    {
      "name": "Plan de Pagos",
      "slug": "plan de pago",
    }
  ]



  private prestamoService = inject(PrestamosService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.addForm = this.fb.group({
      numero: ['', [Validators.required]],
      monto: [''],
      interes: [''],
      tipo: [''],
      nombre: [''],
      fechaFirma: [''],
      // tipo_normativa: ['', [Validators.required]],
      // idUsuario: ['']
    });


    this.addFileForm = this.fb.group({
      tipo: [''],
      archivo: [''],
      // tipo_normativa: ['', [Validators.required]],
      // idUsuario: ['']
    });


    this.editForm = this.fb.group({
      titulo: ['', [Validators.required]],
      fecha: [''],
      fechaFin: [''],
      archivo: [''],
      tipo_normativa: ['', [Validators.required]],
      // idUsuario: ['']
    });
  }

  ngOnInit(): void {
    this.getPrestamos();
    // this.getTipos();
  }

  getPrestamos() {
    this.prestamoService.getAllPrestamos().subscribe
      (res => {
        this.prestamos = res;
        console.log('docs', this.prestamos)
      });
  }

  getPrestamo(prestamo:any){
    this.prestamoSingle = prestamo;
    // console.log(this.prestamoSingle);
  }

  crearPrestamo(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.prestamoService.registerPrestamo(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.addForm.reset();
          this.getPrestamos();
        }
      );
  }

  // getTipos() {
  //   this.prestamoService.getAllTipos().subscribe
  //     (res => {
  //       this.tipos = res;
  //       console.log('modelos', this.tipos)
  //     });
  // }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.prestamoService.changeEstadoDocNormativa(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getPrestamos();
        }
      );
  }

  changeStatus2(id: any, vigente: any) {
    let fd = new FormData();
    fd.append('vigente', vigente);
    console.log(vigente)
    this.prestamoService.changeEstadoDocNormativa(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getPrestamos();
        }
      );
  }

  borrarArchivo(id:any){
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
        this.prestamoService.deleteDocPrestamo(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getPrestamos()
        );
      }
    })
  }

  deleteDocumento(id: string) {
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
        this.prestamoService.deleteDocNormativa(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getPrestamos()
        );
      }
    })
  }

  deleteAmorti(id: string){
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
          'La amortizacion ha sido eliminado.',
          'success'
        )
        this.prestamoService.deleteAmorti(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getPrestamos()
        );
      }
    })
  }

  get form() {
    return this.addForm.controls;
  }

  get form2() {
    return this.addFileForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  getId(id: string) {
    this.prestamoId = id;
    // console.log(this.prestamoId);
  }

  addArchivo() {
    let fd = new FormData();
    fd.append('documento', this.addFileForm.value.tipo);
    fd.append('file', this.files[0]);
    this.prestamoService.addArchivo(fd, this.prestamoId).subscribe(
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
        this.getPrestamos();
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
    if (documento.fechaFin) {
      this.editForm.setValue({
        titulo: documento.titulo,
        fecha: documento.fecha.substr(0, 10),
        fechaFin: documento.fechaFin.substr(0, 10),
        archivo: null,
        tipo_normativa: documento.tipo_normativa._id,
      });
    } else {
      this.editForm.setValue({
        titulo: documento.titulo,
        fecha: documento.fecha.substr(0, 10),
        fechaFin: '',
        archivo: null,
        tipo_normativa: documento.tipo_normativa._id,
      });
    }

    this.idPrestamo = documento._id;
  }

  editDocumento() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('tipo_normativa', this.editForm.value.tipo_normativa);
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('fechaFin', this.editForm.value.fechaFin);
      fd.append('file', this.files[0]);
    } else {
      fd.append('tipo_normativa', this.editForm.value.tipo_normativa);
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('fechaFin', this.editForm.value.fechaFin);
    }

    // let fd = new FormData();

    console.log(this.idPrestamo)

    this.prestamoService.editarDocNormativa(fd, this.idPrestamo).subscribe(
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
        this.getPrestamos();
      }
    );
  }

  addAmorti(id:string){
    console.log(id);
    this.router.navigate(['doc/plantillas/addAmortizacion', id]);
    // this.router.navigate(['doc/compra/update', id]);
  }

}
