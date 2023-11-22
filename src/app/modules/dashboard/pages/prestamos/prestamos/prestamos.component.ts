import { Component, inject } from '@angular/core';
import { PrestamosService } from 'src/app/modules/plantilla-doc/services/prestamos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent {
  prestamos:any = [];
  tipos:any;
  URL = environment.api;
  private prestamoService = inject(PrestamosService);

  ngOnInit(): void {
    this.getPrestamos();
    // this.getTipos();
  }

  getPrestamos() {
    this.prestamoService.getAllPrestamos().subscribe
      (res => {
        this.prestamos = res;
        this.tipos = this.splitArray(this.prestamos.serverResponse, 'credito');
        console.log('docs', this.tipos)
      });
  }

  splitArray(original: any[], type: string) {
     console.log(original);

    const creditos:any = [];
    const fideicomisos:any = [];

    original.forEach(item => {
      if(item.tipo === type){
        creditos.push(item);
      } else {
        fideicomisos.push(item);
      }
    });

    return [creditos, fideicomisos];




  }
}
