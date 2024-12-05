import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { TiposService } from '../../../services/tipos.service';
import { Tipo } from '../../../interfaces/tipo.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormTipoComponent } from '../components/form-tipo/form-tipo.component';
import { FormSubTipoComponent } from '../components/form-sub-tipo/form-sub-tipo.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tipo-index',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './tipo-index.component.html',
  styleUrl: './tipo-index.component.css'
})
export class TipoIndexComponent {

  constructor(private matDialog: MatDialog) { }

  private tipoService = inject(TiposService)

  private tipos = signal<Tipo[]>([]);
  public isLoading = signal(false);
  private error = signal<string | null>(null);
  private _snackBar = inject(MatSnackBar)
  URL = environment.api;


  displayedColumn: string[] = ['nombre', 'sigla', 'subTipos', 'plantilla', 'acciones'];
  dataSource!: MatTableDataSource<Tipo>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos() {
    this.error.set(null);
    this.tipoService.getTipos()
      .subscribe({
        next: (data: any) => {
          this.tipos.set(data.serverResponse);
          console.log(this.tipos());
          this.dataSource = new MatTableDataSource(this.tipos());
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

  createTipo() {
    this.openDialog(0, 'Crear Tipo')
  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormTipoComponent, {
      width: '600px',
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
          this.cargarTipos();
          Swal.fire('Bien', `Tipo Editado Correctamente`, 'success')
        }

        if (resp == 'created') {
          this.cargarTipos();
          Swal.fire('Bien', `Tipo Creado Correctamente`, 'success')
        }

        if(resp == 'submited'){
          this.cargarTipos();
          Swal.fire('Bien', `Plantilla Subida Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  editTipo(id: any) {
    this.openDialog(id, 'Editar Tipo')
  }

  addApoderado(id: string) {
    // this.openDialog2(id, 'Añadir Apoderado', null)
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
        this.tipoService.editTipo(data, id)
          .subscribe({
            next: () => {
              this.cargarTipos();
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

  deleteTipo(id: any) {
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
        this.tipoService.deleteTipo(id)
          .subscribe({
            next: () => {
              this.cargarTipos();
            },
            error: (message: string | undefined) => {
              Swal.fire('Error', message, 'error')
            }
          })
        Swal.fire({
          title: "¡Eliminado!",
          text: "TIpo ha sido eliminado.",
          icon: "success"
        });
      }
    });

  }

  addSubTipo(idTipo: any) {
    this.openDialog2(idTipo, 'Crear Sub Tipo', null)
  }



  openDialog2(idTipo: any, title: any, idSubTipo:any) {
    let dialog = this.matDialog.open(FormSubTipoComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        idTipo: idTipo,
        title: title,
        idSubTipo: idSubTipo,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
          this.cargarTipos();
          Swal.fire('Bien', `Sub Tipo Editado Correctamente`, 'success')
        }

        if(resp == 'created'){
          this.cargarTipos();
          Swal.fire('Bien', `Sub Tipo Creado Correctamente`, 'success')
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

  editSubTipo(idTipo: any, idSubtipo: any) {
    this.openDialog2(idTipo, 'Editar Sub Tipo', idSubtipo)
  }

}
