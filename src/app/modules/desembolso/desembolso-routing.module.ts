import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesembolosoFondosComponent } from './pages/desembolosoFondos/desembolosoFondos.component';
import { TipoFondoComponent } from './pages/tipoFondo/tipoFondo.component';
import { FuentesComponent } from './pages/fuentes/fuentes.component';
import { GastoFondoComponent } from './pages/gastoFondo/gastoFondo.component';

const routes: Routes = [
  {
    path: '', component:DashboardComponent,
    children: [ 
      {path: 'index', component: DesembolosoFondosComponent},  
      {path: 'tipo-fondos', component: TipoFondoComponent},
      {path: 'fuentes', component: FuentesComponent}, // Assuming 'fuentes' uses the same component as 'tipo-fondos'
      {path: 'gasto-fondo', component: GastoFondoComponent} // Assuming 'gasto-fondo' uses the same component as 'fuentes'
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesembolsoRoutingModule { }
