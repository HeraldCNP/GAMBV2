import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private almacenService: AlmacenService) { }

  ngOnInit(): void {
  }

  cerrarGestion(){
    console.log('cerrar');
    Swal.fire({
      title: "Desea realizar el cierre de Gestión?",
      text: "Esta acción generara saldos iniciales y no se podra revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.almacenService.cerrarGestion()
        .subscribe((data: any) => {
          Swal.fire({
            title: "Exito!",
            text: "la accion se realizo con exito.",
            icon: "success"
          });
        });

      }
    });
  }

}

