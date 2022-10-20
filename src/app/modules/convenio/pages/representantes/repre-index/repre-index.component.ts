import { Component, OnInit } from '@angular/core';
import { ConvenioService } from '../../../services/convenio.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repre-index',
  templateUrl: './repre-index.component.html',
  styleUrls: ['./repre-index.component.css']
})
export class RepreIndexComponent implements OnInit {
  representantes:any[] = [];
  URL = environment.api;

  constructor(
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRepresentantes();
  }

  getRepresentantes(){
    this.api.getAllRepresentantes().subscribe
    (res => {
      this.representantes = res;
    });
  }

  addRepresentante(){
    this.router.navigate(['convenio/representante/create'])
  }


  deleteRepresentante(id:any){
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
          'El Representante ha sido eliminado.',
          'success'
        )
        this.api.deleteRepresentante(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getRepresentantes() 
        );
      }
    })
  }

  updateRepresentante(id:any){
    this.router.navigate(['convenio/representante/update', id])
  }
}
