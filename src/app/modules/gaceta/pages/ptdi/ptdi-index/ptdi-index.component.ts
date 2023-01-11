import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';

@Component({
  selector: 'app-ptdi-index',
  templateUrl: './ptdi-index.component.html',
  styleUrls: ['./ptdi-index.component.css']
})
export class PtdiIndexComponent implements OnInit {
  ptdis: any = [];
  ptdi: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  constructor(
    private router: Router,
    private api: GacetaService
  ) { }

  ngOnInit(): void {
    this.getPtdis()
  }

  getPtdis() {
    this.api.getAllPtdis().subscribe
      (res => {
        this.ptdis = res;
        console.log(this.ptdis)
      });
  }

  addPtdia(){
    this.router.navigate(['docAdmin/ptdi/create'])
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.api.changeEstado(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getPtdis();
        }
      );
  }

  generatePDF(){

  }

  getPtdi(id: any){
    this.api.getGaceta(id)
    .subscribe(
      res => {
        this.ptdi = res.serverResponse;
        console.log(this.ptdi)
      },
      err => console.log('HTTP Error', err),
      () => {
        this.showModal = true;
      }
    );
  }

  updatePtdi(id: string) {
    this.router.navigate(['docAdmin/ptdi/update', id])
  }

  deletePtdi(id: string) {
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
          () => this.getPtdis()
        );
      }
    })
  }


}
