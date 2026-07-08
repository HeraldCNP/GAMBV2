import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DesembolsoService } from '../../services/desembolso.service';
import { NgxSelectModule } from 'ngx-select-ex';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-desemboloso-fondos',
  // standalone: true,
  // imports: [FormsModule, ReactiveFormsModule, NgxSelectModule, CommonModule],
  templateUrl: './desembolosoFondos.component.html',
  styleUrl: './desembolosoFondos.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesembolosoFondosComponent {
  idUser: any;
  user: any;
  data: any;
  searchForm: any;

  skip: number = 1;
  page: number = 1;
  limit: number = 20;
  totalPages: any;
  cargando: boolean = true;
  totalData: number = 0;
  date = new Date();

  tipoFondos: any = [];
  funcionarios: any;
  funcionario: any;
  params: any = {};
  desembolsos: any;
  desembolsoForm: any;
  fechaIni = new Date(this.obtenerFechaInicial()).toISOString();
  fechaHoy = new Date().toISOString();

  fuenteForm: any = [];
  paraFuente: any 
  idfuente: any;
  fuente: any;
  fuentes: any = [];
  pdfUrl: any = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private desembolsoService: DesembolsoService, //private matDialog: MatDialog
    private authService: AuthService
  ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.searchForm = this.fb.group({
      catProgra: [''],
      estado: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
      numeroVale: [''],
      productos: false,
    });
    this.desembolsoForm = this.fb.group({
      numero: ['', [Validators.required]],
      fechaDesembolso: [this.fechaHoy.substr(0, 10), [Validators.required]],
      montoTotal: ['', [Validators.required]],
      beneficiario: ['', [Validators.required]],
      idTipoDesembolso: ['', [Validators.required]],
    });
    this.fuenteForm = this.fb.group({
      fechaDesembolso: ['', [Validators.required]],
      beneficiario: ['', [Validators.required]],
      montoTotal: ['', [Validators.required]],
      idFuente: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.cargarDesembolsos();
    this.params = { isActive: true };
    this.cargarFuncionarios(this.params);
    this.cargarTipoFondos();
    this.cargarFuentes();
  }

  obtenerFechaInicial() {
    const date = new Date();
    const year = date.getFullYear();
    return `01/01/${year}`;
  }

  cambiarPagina(valor: number) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }

    let params = {
      limit: this.limit,
      skip: this.skip,
    };
    this.cargarDesembolsos();
  }
  cargarDesembolsos() {
    this.cargando = true;
    
    this.desembolsoService.getDesembolso().subscribe((data: any) => {
      this.desembolsos = data;
      console.log(data);
      this.cargando = false;
      this.totalData = data.length;
      
    });
  }
  addDesembolso(form: any) {
    this.desembolsoService.createDesembolso(form).subscribe(
      (res) => {
        this.cargarDesembolsos();
        this.resetForm();
        this.alertOk(
          'success',
          'Exito',
          'Desembolso Creado Correctamente',
          '2000'
        );
        this.desembolsoForm.submitted = true;
        this.router.navigate(['desembolso/index']);
      },
      (error) => {
        if (error.status === 0) {
          setTimeout(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Conexión',
              text: 'No se puede conectar con el servidor. Por favor, inténtalo más tarde.',
            });
          }, 15);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ALTO!!!',
            text: error.error.message || 'Ocurrió un error inesperado.',
          });
        }
      }
    );
    this.cargarDesembolsos();
    this.resetForm();
  }
  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }
  get form2() {
    return this.desembolsoForm.controls;
  }
  get form() {
    return this.fuenteForm.controls;
  }
  resetForm() {
    this.desembolsoForm.reset();
    this.fuenteForm.reset();
  }
  borrardesembolso(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'El Desembolso ha sido eliminado.', 'success');
        this.desembolsoService.deleteDesembolso(id).subscribe(
          (res) =>{     this.cargarDesembolsos();
      this.resetForm();},
          
          (error) => {
            if (error.status === 0) {
              setTimeout(() => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de Conexión',
                  text: 'No se puede conectar con el servidor. Por favor, inténtalo más tarde.',
                });
              }, 15);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ALTO!!!',
                text: error.error.message || 'Ocurrió un error inesperado.',
              });
            }
          }
        );
      }
      this.cargarDesembolsos();
      this.resetForm();
    });
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarDesembolsos();
      return;
    }
    this.desembolsoService
      .getDesembolsos(0, 20, '', '', '', '', termino)
      .subscribe((resp: any) => {
        
        this.desembolsos = resp.serverResponse;
        this.totalData = resp.totalDocs;
      });
  }
  doSelect = (id: any) => {
    this.funcionario = this.funcionarios.find(
      (objeto: any) => objeto._id === id
    );
    
  };
  doSelect2 = (id: any) => {
    let tipoFondo = this.tipoFondos.find((objeto: any) => objeto._id === id);
    
  };
  doSelect3 = (id: any) => {
    let fuente = this.fuentes.find((objeto: any) => objeto._id === id);
    
  };
  cargarFuncionarios(params?: any) {
    //params.isActive= true;
    this.authService.listUsers(params).subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
    });
  }
  cargarTipoFondos() {
    this.cargando = true;
    this.desembolsoService.getTipoFondos().subscribe((data: any) => {
      this.tipoFondos = data;
      this.totalData = data.length;
      this.cargando = false;
    });
  }
  cargarDataFuente(fuente: any) {
    this.fuente = fuente;
    this.fuenteForm.patchValue({
      fechaDesembolso: fuente.fechaDesembolso,
      beneficiario: fuente.beneficiario._id,
    });   
  }
   addDesembolsoFuente(form: any) {
    form.idDesembolso = this.fuente._id;
    this.desembolsoService.addDesembolsoFuente(form).subscribe(
      (res) => {
        
         this.cargarDesembolsos();
        this.resetForm();
        this.alertOk(
          'success',
          'Exito',
          'Desembolso Fuente Creado Correctamente',
          '2000'
        );
        this.desembolsoForm.submitted = true;
        this.router.navigate(['desembolso/index']);
      },
      (error) => {
        if (error.status === 0) {
          setTimeout(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Conexión',
              text: 'No se puede conectar con el servidor. Por favor, inténtalo más tarde.',
            });
          }, 15);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ALTO!!!',
            text: error.error.message || 'Ocurrió un error inesperado.',
          });
        }
      }
    );
    this.cargarDesembolsos();
     this.resetForm();
  }
   cargarFuentes() {
    this.desembolsoService.getFuentes().subscribe((data: any) => {
      this.fuentes = data;
      
    });
  }
 print(id: any) {
    const url = this.desembolsoService.printDesembolso(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfUrl = fileURL;
      console.log(this.pdfUrl);
      
    });
  }
  printGasto(id: any) {
    const url = this.desembolsoService.printDesembolsoGasto(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfUrl = fileURL;
      console.log(this.pdfUrl);
      
    });
  }

}
