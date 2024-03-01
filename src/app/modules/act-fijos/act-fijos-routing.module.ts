import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AutorizacionIndexComponent } from './pages/autorizaciones/autorizacion-index/autorizacion-index.component';
import { AutorizacionCreateComponent } from './pages/autorizaciones/autorizacion-create/autorizacion-create.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [


      { path: 'autorizacion/index', component: AutorizacionIndexComponent },
      { path: 'autorizacion/create', component: AutorizacionCreateComponent },
      // { path: 'poa/update/:id', component: PoaUpdateComponent },

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
