import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [

      // { path: 'compra/create', component: CompraCreateComponent },
      // { path: 'compra/update/:id', component: CompraUpdateComponent },

      // { path: 'poa/index', component: PoaIndexComponent },
      // { path: 'poa/create', component: PoaCreateComponent },
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
export class ArchivosRoutingModule { }
