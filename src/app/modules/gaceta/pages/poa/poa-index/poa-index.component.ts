import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';

@Component({
  selector: 'app-poa-index',
  templateUrl: './poa-index.component.html',
  styleUrls: ['./poa-index.component.css']
})


export class PoaIndexComponent implements OnInit {
  poas: any = [];
  poa: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  constructor(
    private router: Router,
    private api: GacetaService
  ) { }

  ngOnInit(): void {
    this.getPoas()
  }


  getPoas() {
    this.api.getAllPoas().subscribe
      (res => {
        this.poas = res;
        console.log(this.poas)
      });
  }

  addPoa() {
    this.router.navigate(['docAdmin/poa/create'])
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.api.changeEstadoPoa(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getPoas();
        }
      );
  }

  generatePDF(){

  }

  getPoa(id: any){
    this.api.getGaceta(id)
    .subscribe(
      res => {
        this.poa = res.serverResponse;
        console.log(this.poa)
      },
      err => console.log('HTTP Error', err),
      () => {
        this.showModal = true;
      }
    );
  }


  updatePoa(id: string) {
    this.router.navigate(['docAdmin/gaceta/update', id])
  }

  deletePoa(id: string) {
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
        this.api.deleteGaceta(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getPoas()
        );
      }
    })
  }

}
