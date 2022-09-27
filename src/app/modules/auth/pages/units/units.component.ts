import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  units:any = [];
  URL = environment.api;
  unitForm: FormGroup = new FormGroup({});
  
  constructor(
    private api: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createform(),
    this.getUnits()
  }


  createform(){
    this.unitForm = new FormGroup({
      nombrecargo : new FormControl('', Validators.required),
    })
  }

  getUnits(){
    this.api.getAllUnits().subscribe
    (res => {
      this.units = res;
      // console.log(res)
    });
  }

  sendFormUnit(unit: any){
    this.api.sendUnit(unit).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
              this.router.navigate(['auth/unit/index']),
              this.alertOk('success', 'Exito', 'Unidad Creada Correctamente', '2000'),
              this.getUnits(),
              this.createform()
            }
    )
  }


  alertOk( icon:any, title:any, text:any, timer:any){
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }


  onDeleteUnit(id:any){
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
          'La Unidad ha sido eliminada.',
          'success'
        )
        this.api.deleteUnit(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getUnits() 
        );
      }
    })
  }

  onRegisterCharge(id:any){
  this.router.navigate(['auth/charge/index', id])
  }
}
