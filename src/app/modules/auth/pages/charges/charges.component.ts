import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {

  charge:any = [];
  URL = environment.api;
  chargeForm: FormGroup = new FormGroup({});
  unitId:any;

  constructor(
    private api: AuthService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.unitId = this.activeRouter.snapshot.paramMap.get('id'),
    this.createform(),
    this.getUnit(this.unitId)
  }

  createform(){
    this.chargeForm = new FormGroup({
      nombresubdir : new FormControl('', Validators.required)
    })
  }

  getUnit(id:any){
    this.api.getUnit(id).subscribe
    (res => {
      this.charge = res;
      console.log(res)
    });
  }


  sendFormCharge(charge: any, id:any){
    this.api.sendCharge(charge, id).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
              this.router.navigate(['auth/charge/index']),
              this.alertOk('success', 'Exito', 'Cargo Creado Correctamente', '2000'),
              this.getUnit(id),
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

  // onDeleteCharge(id:any){
  //   Swal.fire({
  //     title: 'Estas seguro?',
  //     text: "¡No podrás revertir esto!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'Cancelar',
  //     confirmButtonText: '¡Sí, bórralo!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         '¡Eliminado!',
  //         'El Cargo ha sido eliminado.',
  //         'success'
  //       )
  //       this.api.deleteUnit(id).subscribe(
  //         res => console.log(res),
  //         err => console.log('HTTP Error', err),
  //         () => this.getCharges() 
  //       );
  //     }
  //   })
  // }

}
