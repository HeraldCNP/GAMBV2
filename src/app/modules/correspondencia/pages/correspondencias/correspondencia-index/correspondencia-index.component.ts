import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { CorrespondenciasService } from '../../../services/correspondencias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { FormCorrespondenciaComponent } from '../components/form-correspondencia/form-correspondencia.component';
import { environment } from 'src/environments/environment';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TiposService } from '../../../services/tipos.service';
import { FormUploadComponent } from '../components/form-upload/form-upload.component';

@Component({
  selector: 'app-correspondencia-index',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './correspondencia-index.component.html',
  styleUrl: './correspondencia-index.component.css'
})
export class CorrespondenciaIndexComponent {

  idUser: any;
  user: any;
  data: any;
  correspondencias: any[] = [];
  URL = environment.api;


  constructor(private matDialog: MatDialog) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
  }

  private correspondenciaService = inject(CorrespondenciasService)
  private tipoService = inject(TiposService );


  isLoading = signal(false);
  private error = signal<string | null>(null);
  private _snackBar = inject(MatSnackBar)
  params: any = {};
  tipos = signal<any>(null);


  displayedColumns: string[] = ['tipo', 'subTipo', 'cite', 'referencia', 'hojaRuta', 'acciones'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getTipos();
    this.cargarCorrespondencias();
    
  }

  cargarCorrespondencias(params?: any) {
    this.error.set(null);
    this.correspondenciaService.getCorrespondencias(params)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.correspondencias = data.serverResponse;
          this.dataSource = new MatTableDataSource(this.correspondencias);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: string | any) => {
          console.log(error);
          this._snackBar.open(error.message, 'Cerrar', { duration: 3000 });
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }
  createCorrespondencia() {
    this.openDialog(0, 'Crear Correspondencia')
  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormCorrespondenciaComponent, {
      width: '700px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
          this.cargarCorrespondencias();
          Swal.fire('Bien', `Dependencia Editada Correctamente`, 'success')
        }

        if (resp == 'created') {
          this.cargarCorrespondencias();
          Swal.fire('Bien', `Correspondencia Creada Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  editCorrespondencia(id: any) {
    this.openDialog(id, 'Editar Correspondencia')
  }

  uploadDocument(id: string) {
    this.openDialog2(id, 'Subir Documento')
  }

  editApoderado(id: any, idApoderado: any) {
    // this.openDialog2(id, 'Editar Apoderado', idApoderado)
  }

  verApoderado(idApoderado: any) {
    // this.openDialog2(null, 'Ver Apoderado', idApoderado)
  }

  hideDependencia(id: string) {
    let data = {
      isActive: false
    }
    Swal.fire({
      title: "Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.correspondenciaService.editDependencia(data, id)
          .subscribe({
            next: () => {
              this.cargarCorrespondencias();
            },
            error: (message: string | undefined) => {
              Swal.fire('Error', message, 'error')
            }

          })
        Swal.fire({
          title: "¡Eliminado!",
          text: "Dependencia ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }

  deleteDependencia(id: any) {
    Swal.fire({
      title: "Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.correspondenciaService.deleteDependencia(id)
          .subscribe({
            next: () => {
              this.cargarCorrespondencias();
            },
            error: (message: string | undefined) => {
              Swal.fire('Error', message, 'error')
            }
          })
        Swal.fire({
          title: "¡Eliminado!",
          text: "Dependencia ha sido eliminada.",
          icon: "success"
        });
      }
    });

  }



  openDialog2(idCorrespondencia: any, title: any) {
    let dialog = this.matDialog.open(FormUploadComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        idCorrespondencia: idCorrespondencia,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
          // this.cargarBeneficiaries();
          Swal.fire('Bien', `Apoderado Editado Correctamente`, 'success')
        }

        if(resp == 'created'){
          // this.cargarBeneficiaries();
          Swal.fire('Bien', `Apoderado Creado Correctamente`, 'success')
        }

        if(resp == 'submited'){
          this.cargarCorrespondencias();
          Swal.fire('Bien', `Documento Subido Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  downloadCorrespondencia(name:any){
    this.correspondenciaService.downloadCorrespondencia(name).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
    }, error => {
      console.error('Error fetching PDF URL', error);
    });
  }

  onOptionSelected(event: MatButtonToggleChange) {
    // console.log('Opción seleccionada:', event.value);
    this.params = { 
      // idUsuario: this.idUser,
      idTipo: event.value
    };
    this.cargarCorrespondencias(this.params);
    // Actualizar otras partes de tu aplicación con el nuevo valor
  }

  getTipos() {
    this.tipoService.getTipos()
      .subscribe({
        next: (data: any) => {
          this.tipos.set(data.serverResponse);
          // console.log(this.tipos());
        }
      })
  }

}
