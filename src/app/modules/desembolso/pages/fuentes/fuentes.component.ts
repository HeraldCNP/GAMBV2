import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DesembolsoService } from '../../services/desembolso.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-fuentes',
  // standalone: true,
  // imports: [],
  templateUrl: './fuentes.component.html',
  styleUrl: './fuentes.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuentesComponent {
  idUser: any;
  user: any;
  data: any;
  totalData: number = 0;
  cargando: boolean = true;
  fuenteForm: any;
  editForm: any;
  fuentes: any = [];
  ff: any = [];
  ofin: any = [];
  idFuente: any = '';
  ffCodigo:any = '';
  ffDenominacion:any = '';;
  ffSigla:any = '';
  ofinCodigo:any = '';;
  ofinDenominacion:any = '';;
  ofinSigla: any = '';;

  constructor(
    private fuenteService: DesembolsoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.fuenteForm = this.fb.group({
      idff: ['', [Validators.required]],
      idof: ['', [Validators.required]],
    });

    this.editForm = this.fb.group({
    ffof: ['', [Validators.required]],
      sigla: ['', [Validators.required]],
      denominacion: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.cargarFuentes();
    this.cargarFuenteFinanc();
    this.cargarOrgFinanc();
  }
  cargarFuentes() {
    this.cargando = true;
    this.fuenteService.getFuentes().subscribe((data: any) => {
      this.fuentes = data;
      this.totalData = data.length;
      this.cargando = false;
    });
  }
  cargarFuenteFinanc() {
    this.fuenteService.getFuenteFinanciadores().subscribe((data: any) => {
      this.ff = data;
    });
  }
  cargarOrgFinanc() {
    this.fuenteService.getOrgFinanciadores().subscribe((data: any) => {
      this.ofin = data;
    });
  }
  cargarDataEdit(fuente: any) {
    this.editForm.patchValue({
      ffof: fuente.ffof,
      denominacion: fuente.denominacion,
      sigla: fuente.sigla,
    });
    this.idFuente = fuente._id;
  }
    addFuente(form: any) {
    this.fuenteService.addFuente(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.fuenteForm.reset();
        this.cargarFuentes();
        this.alertOk('success', 'Exito', 'Tipo de Fondo Creada Correctamente', '2000');
      }
    );
  }

 editFuente(form: any) {
    this.fuenteService.editFuente(form, this.idFuente).subscribe(
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
          'Tipo de Fondo editado Correctamente',
          '2000'
        );
        this.cargarFuentes();
      }
    );
  }
  get form() {
    return this.fuenteForm.controls;
  }
  resetForm() {
    this.fuenteForm.reset();
  }
    alertOk(icon: any, title: any, text: any, timer: any) {
        Swal.fire({
          icon,
          title,
          text,
          timer,
        });
      }
  borraFuente(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fuenteService.deleteFuente(id).subscribe((data: any) => {
          Swal.fire(
            'Eliminado!',
            'El F.F.- O.F. ha sido eliminado.',
            'success'
          );
          this.cargarFuentes();
        });
      }
    });
  }
   doSelect = (id: any) => {
    let ffin = this.ff.find((objeto: any) => objeto._id === id);
    this.ffCodigo = ffin.codigo;
    this.ffDenominacion = ffin.denominacion;
    this.ffSigla = ffin.sigla;
    
  };
  doSelect2 = (id: any) => {
    let ofin = this.ofin.find((objeto: any) => objeto._id === id);
    this.ofinCodigo = ofin.codigo;
    this.ofinDenominacion = ofin.denominacion;
    this.ofinSigla = ofin.sigla;
  };
 
}
