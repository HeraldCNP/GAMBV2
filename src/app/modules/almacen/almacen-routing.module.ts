import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadIndexComponent } from './pages/actividades/actividad-index/actividad-index.component';
import { ArticuloCreateComponent } from './pages/articulos/articulo-create/articulo-create.component';
import { ArticuloIndexComponent } from './pages/articulos/articulo-index/articulo-index.component';
import { CategoriaIndexComponent } from './pages/categorias/categoria-index/categoria-index.component';
import { CompraCreateComponent } from './pages/compras/compra-create/compra-create.component';
import { CompraIndexComponent } from './pages/compras/compra-index/compra-index.component';
import { CompraUpdateComponent } from './pages/compras/compra-update/compra-update.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EgresoCreateComponent } from './pages/egresos/egreso-create/egreso-create.component';
import { EgresoIndexComponent } from './pages/egresos/egreso-index/egreso-index.component';
import { MedidaIndexComponent } from './pages/medidas/medida-index/medida-index.component';
import { ProgramaIndexComponent } from './pages/programas/programa-index/programa-index.component';
import { ProveedorIndexComponent } from './pages/proveedores/proveedor-index/proveedor-index.component';
import { ProyectoIndexComponent } from './pages/proyectos/proyecto-index/proyecto-index.component';
import { VehiculoIndexComponent } from './pages/vehiculos/vehiculo-index/vehiculo-index.component';
import { ReportIndexComponent } from './pages/report/report-index/report-index.component';
import { ReportIngresoComponent } from './pages/report/report-ingreso/report-ingreso.component';
import { ReportEntradasComponent } from './pages/report/report-entradas/report-entradas.component';
import { ReportArticulosComponent } from './pages/report/report-articulos/report-articulos.component';
import { CatPrograIndexComponent } from './pages/catProgras/cat-progra-index/cat-progra-index.component';
import { EgresoUpdateComponent } from './pages/egresos/egreso-update/egreso-update.component';
import { ReportFisicoValoradoComponent } from './pages/report/report-fisico-valorado/report-fisico-valorado.component';
import { ValeListAutorizacionComponent } from './pages/vales/vale-list-autorizacion/vale-list-autorizacion.component';
import { ValeCreateComponent } from './pages/vales/vale-create/vale-create.component';
import { ValeIndexComponent } from './pages/vales/vale-index/vale-index.component';
import { ValeNewComponent } from './pages/vales/vale-new/vale-new.component';
import { ValeLubriComponent } from './pages/vales/vale-lubri/vale-lubri.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'categoria/index', component: CategoriaIndexComponent },
      { path: 'programa/index', component: ProgramaIndexComponent },
      { path: 'proyecto/index', component: ProyectoIndexComponent },
      { path: 'actividad/index', component: ActividadIndexComponent },
      { path: 'proveedor/index', component: ProveedorIndexComponent },
      { path: 'articulo/index', component: ArticuloIndexComponent },
      { path: 'articulo/create', component: ArticuloCreateComponent },
      { path: 'compra/index', component: CompraIndexComponent },
      { path: 'compra/create', component: CompraCreateComponent },
      { path: 'compra/update/:id', component: CompraUpdateComponent },
      { path: 'egreso/index', component: EgresoIndexComponent },
      { path: 'egreso/create', component: EgresoCreateComponent },
      { path: 'egreso/update/:id', component: EgresoUpdateComponent },
      { path: 'medida/index', component: MedidaIndexComponent },
      { path: 'catProgra/index', component: CatPrograIndexComponent },

      { path: 'vehiculo/index', component: VehiculoIndexComponent },

      { path: 'reporte/index', component: ReportIndexComponent },
      { path: 'reporte/ingresos', component:  ReportIngresoComponent},
      { path: 'reporte/entradas', component:  ReportEntradasComponent},
      { path: 'reporte/articulos', component:  ReportArticulosComponent},
      { path: 'reporte/fisicoValorado', component:  ReportFisicoValoradoComponent},
      // { path: 'compra/create', component: CompraCreateComponent },
      // { path: 'compra/update/:id', component: CompraUpdateComponent },

      { path: 'vale/listAutorizacion', component: ValeListAutorizacionComponent },
      { path: 'vale/create/:id', component: ValeCreateComponent },
      { path: 'vale/index', component: ValeIndexComponent },
      { path: 'vale/new', component: ValeNewComponent },
      { path: 'vale/lubricantes', component: ValeLubriComponent },
      // { path: 'ptdi/update/:id', component: PtdiUpdateComponent },

      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
