import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AutorizacionService } from '../../../services/autorizacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValeService } from 'src/app/modules/almacen/services/vale.service';
import { ComprasService } from 'src/app/modules/almacen/services/compras.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-orden',
  templateUrl: './listOrden.html',
  styleUrl: './listOrden.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOrden {
   idUser: any;
  user: any;
  data: any;
  ordenes: any = [];
  cargando: boolean = true;
   pdfUrl: any = '';

   constructor(
        private activeRouter: ActivatedRoute,
        private fb: FormBuilder,
        private comprasService: ComprasService,
        private router: Router,
        private valeService: ValeService,
        private autorizacionService: AutorizacionService,
        ) {
        this.user = localStorage.getItem('user');
        this.data = JSON.parse(this.user);
        this.idUser = this.data.id;}

   ngOnInit(): void {
    this.cargarOrdenes();
   }

    cargarOrdenes(params?: any) {
    this.cargando = true;
    this.autorizacionService.queryOrdenes(params).subscribe((data: any) => {
      this.ordenes = data;
     console.log('data', data);
     
      this.cargando = false;
    });
  }
  printOrden(id: any) {
    const url = this.autorizacionService.printOrden(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfUrl = fileURL;
      console.log(this.pdfUrl);
      
    });
  }
   edit(id: any) {
    // Redireccionamos a la ruta de editar una autorización con el id pasado
    this.router.navigate(['/actFijos/addGasto', id]);
  }
 }
