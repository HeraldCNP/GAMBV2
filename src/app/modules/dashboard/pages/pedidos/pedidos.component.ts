import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidosComponent implements OnInit { 
  pedidos: any = [];
    URL = environment.api;

   constructor(
      private api: PedidosService,
      private router: Router
    ) { }
  

  ngOnInit(): void {
    this.getPedidos()
    console.log(this.pedidos);
  }
  getPedidos() {
    this.api.getAllPedidos().subscribe(
      (    res: any) => { this.pedidos = res;
      console.log("pedidos", this.pedidos)
    }
    );
  }
   addPedido() {
    this.router.navigate(['dashboard/solicitud-materiales/add']);
  }
  editPedido(id: number) {
    this.router.navigate(['/dashboard/pedidos/edit', id]);
  }
  deletePedido(id: number) {
    this.api.deletePedido(id).subscribe(
      (res: any) => {
        console.log(res);
        this.getPedidos();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  viewPedido(id: number) {
    this.router.navigate(['/dashboard/pedidos/view', id]);
  }
}
