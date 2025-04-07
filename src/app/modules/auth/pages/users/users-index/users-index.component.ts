import { Component, inject, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {
  users: any;
  constructor(
    private api: AuthService,
    private router: Router,
  ) { }

  private _snackBar = inject(MatSnackBar)

  status: string = 'Activo';

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      },
       (error) => {
              console.log(error);
              if (error.status === 0) {
                setTimeout(() => {
                  Swal.fire({
                      icon: "error",
                      title: "Error de Conexión",
                      text: "No se puede conectar con el servidor. Por favor, inténtalo más tarde.",
                  });
              }, 15);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.error.serverResponse || 'Ocurrió un error inesperado.',
                });
              }
              this.router.navigate(['/', 'login'])
            }
    );
  }

  editUser(user: Usuario) {
    this.router.navigate(['auth/users/update', user._id])
  }

  deleteUser(user: Usuario) {

  }

  changeEstado(Event: any, id: string) {
    console.log(Event.checked);
    console.log(id);

    this.editUsuario(Event.checked, id);
  }

  editUsuario(status: boolean, id: string) {
    let data = {
      isActive: status
    }
    this.api.editUser(data, id).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.getUsers();
        this._snackBar.open('Estado Actualizado', 'Cerrar', {
          duration: 3000
        });
      }
    );
    
  }


}
