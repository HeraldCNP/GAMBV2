import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Dependencia } from '../../../interfaces/dependencia.interface';
import { DependenciasService } from '../../../services/dependencias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDependenciaComponent } from '../components/form-dependencia/form-dependencia.component';
import { MatDialog } from '@angular/material/dialog';
import { ShowUserComponent } from '../components/show-user/show-user.component';

@Component({
  selector: 'app-dependencia-index',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dependencia-index.component.html',
  styleUrl: './dependencia-index.component.css'
})
export class DependenciaIndexComponent {

  constructor(private matDialog: MatDialog) { }

  private dependenciaService = inject(DependenciasService)

  private dependencias = signal<Dependencia[]>([]);
  public isLoading = signal(false);
  private error = signal<string | null>(null);
  private _snackBar = inject(MatSnackBar)


  displayedColumn: string[] = ['descripcion', 'sigla', 'acciones'];
  dataSource!: MatTableDataSource<Dependencia>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  beneficiaries = signal<any>(null);



  ngOnInit(): void {
    this.cargarDependencias();
  }


  cargarDependencias() {
    this.error.set(null);
    this.dependenciaService.getDependencias()
      .subscribe({
        next: (data: any) => {
          this.dependencias.set(data.serverResponse);
          console.log(this.dependencias());
          this.dataSource = new MatTableDataSource(this.dependencias());
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

  createDependencia() {
    this.openDialog(0, 'Crear Dependencia')
  }

    openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormDependenciaComponent, {
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
          this.cargarDependencias();
          Swal.fire('Bien', `Dependencia Editada Correctamente`, 'success')
        }

        if(resp == 'created'){
          this.cargarDependencias();
          Swal.fire('Bien', `Dependencia Creada Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  editDependencia(id: any) {
    this.openDialog(id, 'Editar Dependencia')
  }

  addApoderado(id:string){
    // this.openDialog2(id, 'Añadir Apoderado', null)
  }

  editApoderado(id:any, idApoderado: any){
    // this.openDialog2(id, 'Editar Apoderado', idApoderado)
  }

  showUsers(idDependencia: any) {
    this.openDialog2(null, 'Ver Usuarios', idDependencia)
  }

  openDialog2(id: any, title: any, idDependencia:any) {
    let dialog = this.matDialog.open(ShowUserComponent, {
      width: '800px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
        idDependencia: idDependencia,
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
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }


  hideDependencia(id:string){
    let data = {
      isActive : false
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
        this.dependenciaService.editDependencia(data, id)
        .subscribe({
          next: () => {
            this.cargarDependencias();
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
        this.dependenciaService.deleteDependencia(id)
        .subscribe({
          next: () => {
            this.cargarDependencias();
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



  // openDialog2(id: any, title: any, idApoderado:any) {
  //   let dialog = this.matDialog.open(FormApoderadoComponent, {
  //     width: '600px',
  //     enterAnimationDuration: '500ms',
  //     exitAnimationDuration: '1000ms',
  //     data: {
  //       id: id,
  //       title: title,
  //       idApoderado: idApoderado,
  //     }
  //   });
  //   dialog.afterClosed().subscribe({
  //     next: (resp: any) => {
  //       if (resp == 'edited') {
  //         this.cargarBeneficiaries();
  //         Swal.fire('Bien', `Apoderado Editado Correctamente`, 'success')
  //       }

  //       if(resp == 'created'){
  //         this.cargarBeneficiaries();
  //         Swal.fire('Bien', `Apoderado Creado Correctamente`, 'success')
  //       }
  //     },
  //     error: (resp: any) => {
  //       console.log(resp.error.message);
  //       // Swal.fire('Error', resp, 'error')
  //       // Swal.fire('Error', resp, 'error')
  //     }
  //   })
  // }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
