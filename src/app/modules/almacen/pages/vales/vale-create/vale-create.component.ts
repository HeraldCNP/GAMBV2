import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { ValeService } from '../../../services/vale.service';

@Component({
  selector: 'app-vale-create',
  templateUrl: './vale-create.component.html',
  styleUrls: ['./vale-create.component.css']
})
export class ValeCreateComponent {
  idUser: any;
  user: any;
  data: any;
  idAutorizacion: any;
  createForm: any;

  catProgras: any;
  compras:any;

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private router: Router,
    private valeService: ValeService
    ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.idAutorizacion = this.activeRouter.snapshot.paramMap.get('id');

    console.log(this.idAutorizacion);

    this.createForm = this.fb.group({
      autorizacion: [this.idAutorizacion],
      cantidad: ['', [Validators.required]],
      catProgra: ['', [Validators.required]],
      encargadoControl: [this.idUser],
      idCompra: [''],
      idProducto: [''],
    });



  }

  ngOnInit(): void {
    this.cargarCatProgras();
  }


  cargarCatProgras() {
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      console.log("Cat Progras", this.catProgras)
    });
  }

  get form() {
    return this.createForm.controls;
  }

  crearVale(form:any){

  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
    this.valeService.getCompraOfCombustible(this.createForm.value.idProducto, this.createForm.value.catProgra).subscribe((data: any) => {
      this.compras = data.serverResponse;
      console.log("Compras", data)
    });

  }

  cancel() {
    this.router.navigate(['actFijos/autorizacion/index'])
  }



}
