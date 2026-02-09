import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AutorizacionIndexComponent } from './pages/autorizaciones/autorizacion-index/autorizacion-index.component';
import { AutorizacionCreateComponent } from './pages/autorizaciones/autorizacion-create/autorizacion-create.component';
import { AutorizacionUpdateComponent } from './pages/autorizaciones/autorizacion-update/autorizacion-update.component';
import { Gastos } from './pages/gastos/gastos';
import { ListOrden } from './pages/ordenes/listOrden/listOrden';
import { NewOrden } from './pages/ordenes/newOrden/newOrden';
import { AddGasto } from './pages/addGasto/addGasto';
import { GastoReport } from './pages/gastoReport/gastoReport';
import { GastoEdit } from './pages/gastoEdit/gastoEdit';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [


      { path: 'autorizacion/index', component: AutorizacionIndexComponent },
      { path: 'autorizacion/create', component: AutorizacionCreateComponent },
      { path: 'autorizacion/update/:id', component: AutorizacionUpdateComponent },
      { path: 'gastos', component: Gastos },
      { path: 'ordenes', component: ListOrden },
      { path: 'newOrden', component: NewOrden },
      { path: 'addGasto/:id', component: AddGasto },
      { path: 'gastoReport', component: GastoReport },
      { path: 'gastoEdit/:id', component: GastoEdit },


      // { path: 'ptdi/index', component: PtdiIndexComponent },
      // { path: 'ptdi/create', component: PtdiCreateComponent },
      // { path: 'ptdi/update/:id', component: PtdiUpdateComponent },

      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActFijosRoutingModule { }
