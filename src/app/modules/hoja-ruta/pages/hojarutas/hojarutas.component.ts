import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { Hojaruta } from '../../models/hojaruta';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hojarutas',
  templateUrl: './hojarutas.component.html',
  styleUrls: ['./hojarutas.component.css']
})
export class HojarutasComponent implements OnInit {
  user: any;
  data: any;
  hojaRutas: any = [];
  hojaRuta: any = [];
  seguim: any = [];
  /*variables de consulta*/   
  nuit: string = "";
  origen: any = "";
  referencia: string = "";
  limit: number = 100;
  skip: number = 0;
  /*end variables de consulta*/
  /*variables de estados*/   
  estadoRecibido: string = "RECIBIDO";

  /*end variables de estados*/   
  idhr:string=""
  constructor(private api: RutaService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.getHojaRutas()
  }

  getHojaRutas() {
    this.api.getAllHojaRuta(this.nuit, this.origen, this.limit, this.skip).subscribe(
      data => {
        this.hojaRutas = data;
        console.log(this.hojaRutas)
      }
    )
  }
  cambiarestado(id: any){
    this.api.obtenerHoja(id).subscribe(data => {
      this.hojaRuta = data.serverResponse;
      let idh = this.hojaRuta._id;
      const HOJA: Hojaruta = {
        estado: this.estadoRecibido,
      }
      if (this.hojaRuta.estado === "REGISTRADO"){
        Swal.fire({
          title: 'Estás seguro Recibir?',
          text: "Esta seguro de recibir el trámite?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Recibir'
        }).then((result) => {
          if (result.isConfirmed) {
            this.api.EditarHoja(idh, HOJA).subscribe(data => {
            this.getHojaRutas()
            }, error => {
              console.log(error);
            })
          }
        })
      }
    }, error => {
      console.log(error);
    })
  }

  seguimi(idh: any){
    //this.loading = true;
    this.idhr=idh
    this.api.obtenerHoja(idh).subscribe(data => {
     // this.loading = false;
      this.hojaRuta = data.serverResponse;
      this.api.buscarnuit(this.hojaRuta.nuit).subscribe(data => {
        this.seguim = data;
      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })
    
  }

}
