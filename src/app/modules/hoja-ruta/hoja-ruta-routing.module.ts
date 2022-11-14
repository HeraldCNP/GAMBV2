import { NgModule } from '@angular/core';
import { GuardGuard } from './guard/guard.guard';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OfficeIndexComponent } from './pages/myOffice/office-index/office-index.component';
import { DerivarSeguimientoComponent } from './pages/derivar-seguimiento/derivar-seguimiento.component';
import { HojarutasComponent } from './pages/hojarutas/hojarutas.component';
import { HomeComponent } from './pages/home/home.component';
import { AsociarComponent } from './pages/asociar/asociar.component';
import { EditHojaComponent } from './pages/edit-hoja/edit-hoja.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';
import { SendArchivoOfiComponent } from './pages/send-archivo-ofi/send-archivo-ofi.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {path: '', component: HomeComponent},
      {path: 'office/index', component: OfficeIndexComponent,canActivate:[GuardGuard]},
      {path: 'pendientes', component: PendientesComponent},
      {path: 'hojaRutas', component: HojarutasComponent},
      {path: 'hojaRutas/:search', component: HojarutasComponent},
      {path: 'asociar/:nuit', component: AsociarComponent},
      {path: 'editHoja/:id', component: EditHojaComponent},
      {path: 'derivar/:idHr/:idSegui', component: DerivarSeguimientoComponent},
      {path: 'sendArchivoOfi/:idHr/:idSegui', component: SendArchivoOfiComponent},
      {path: 'derivar/:idHr', component: DerivarSeguimientoComponent},
      {path: '**', redirectTo:'dashboard', pathMatch: 'full'},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HojaRutaRoutingModule { }
