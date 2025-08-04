import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DesembolsoService } from '../../services/desembolso.service';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tipo-fondo',
  templateUrl: './tipoFondo.component.html',
   styleUrls: ['./tipoFondo.component.css'],
})
export class TipoFondoComponent {
  idUser: any;
  user: any;
  data: any;
  totalData: number = 0;
  cargando: boolean = true;
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  tipoFondosForm: any = [];
  tipoFondos: any = [];

  editForm: any;
  idTipoFondo: any;

  constructor(
    private desembolsoService: DesembolsoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.tipoFondosForm = this.fb.group({
      denominacion: ['', [Validators.required]],
 
    });

     this.editForm = this.fb.group({
      denominacion: ['', [Validators.required]],
      
    });
  }
  ngOnInit(): void {
    this.cargarTipoFondos();    
  }
  cargarTipoFondos() {
    this.cargando = true;
    this.desembolsoService.getTipoFondos().subscribe((data: any) => {
      this.tipoFondos = data;
      this.totalData = data.length;
      console.log(data);
      
      this.cargando = false;
    });
  }

   borraTipoFondo(id: string) {
      Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Sí, bórralo!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('¡Eliminado!', 'El Tipo de Fondo ha sido eliminado.', 'success');
          this.desembolsoService.deleteTipoFondo(id).subscribe(
            (res) => console.log(res),
            (err) => console.log('HTTP Error', err),
            () => this.cargarTipoFondos()
          );
        }
      });
    }

    addTipoFondo(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.desembolsoService.addTipoFondo(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.tipoFondosForm.reset();
        this.cargarTipoFondos();
        this.alertOk('success', 'Exito', 'Tipo de Fondo Creada Correctamente', '2000');
      }
    );
  }
    get form2() {
    return this.tipoFondosForm.controls;
  }
  resetForm() {
    this.tipoFondosForm.reset();
  }
   editTipoFondo(form: any) {
    this.desembolsoService.editTipoFondo(form, this.idTipoFondo).subscribe(
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
        this.cargarTipoFondos();
      }
    );
  }
  alertOk(icon: any, title: any, text: any, timer: any) {
      Swal.fire({
        icon,
        title,
        text,
        timer,
      });
    }
 
   cargarDataEdit(tipoFondo: any) {
    this.editForm.setValue({
      denominacion: tipoFondo.denominacion,
    });
    this.idTipoFondo = tipoFondo._id;
  }
  
}
