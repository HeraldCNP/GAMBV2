import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OfficeIndexComponent } from './pages/myOffice/office-index/office-index.component';
import { DerivarSeguimientoComponent } from './pages/derivar-seguimiento/derivar-seguimiento.component';
import { HojarutasComponent } from './pages/hojarutas/hojarutas.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {path: '', component: HomeComponent},
      {path: 'office/index', component: OfficeIndexComponent},
      {path: 'hojaRutas', component: HojarutasComponent},
      {path: 'derivar/:idHr/:idSegui', component: DerivarSeguimientoComponent},
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
