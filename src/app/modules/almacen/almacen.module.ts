import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { NgxPrintModule } from 'ngx-print';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriaIndexComponent } from './pages/categorias/categoria-index/categoria-index.component';
import { ProgramaIndexComponent } from './pages/programas/programa-index/programa-index.component';
import { ProyectoIndexComponent } from './pages/proyectos/proyecto-index/proyecto-index.component';
import { ActividadIndexComponent } from './pages/actividades/actividad-index/actividad-index.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ProveedorIndexComponent } from './pages/proveedores/proveedor-index/proveedor-index.component';
import { ArticuloIndexComponent } from './pages/articulos/articulo-index/articulo-index.component';
import { ArticuloCreateComponent } from './pages/articulos/articulo-create/articulo-create.component';
import { CompraCreateComponent } from './pages/compras/compra-create/compra-create.component';
import { CompraIndexComponent } from './pages/compras/compra-index/compra-index.component';
import { EgresoIndexComponent } from './pages/egresos/egreso-index/egreso-index.component';
import { EgresoCreateComponent } from './pages/egresos/egreso-create/egreso-create.component';
import { CompraUpdateComponent } from './pages/compras/compra-update/compra-update.component';
import { MedidaIndexComponent } from './pages/medidas/medida-index/medida-index.component';
import { MedidaEditComponent } from './pages/medidas/medida-edit/medida-edit.component';
import { VehiculoIndexComponent } from './pages/vehiculos/vehiculo-index/vehiculo-index.component';
import { ReportIndexComponent } from './pages/report/report-index/report-index.component';
import { ReportIngresoComponent } from './pages/report/report-ingreso/report-ingreso.component';
import { ReportEntradasComponent } from './pages/report/report-entradas/report-entradas.component';
import { ReportArticulosComponent } from './pages/report/report-articulos/report-articulos.component';
import { CatPrograIndexComponent } from './pages/catProgras/cat-progra-index/cat-progra-index.component';
import { EgresoUpdateComponent } from './pages/egresos/egreso-update/egreso-update.component';
import { ReportFisicoValoradoComponent } from './pages/report/report-fisico-valorado/report-fisico-valorado.component';
import { ValeListAutorizacionComponent } from './pages/vales/vale-list-autorizacion/vale-list-autorizacion.component';
import { ValeIndexComponent } from './pages/vales/vale-index/vale-index.component';
import { ValeCreateComponent } from './pages/vales/vale-create/vale-create.component';
import { ValeUpdateComponent } from './pages/vales/vale-update/vale-update.component';
import { ValeNewComponent } from './pages/vales/vale-new/vale-new.component';
import { ValeLubriComponent } from './pages/vales/vale-lubri/vale-lubri.component';
import { LoaderDirective } from 'src/app/core/directives/loader.directive';
import { MaterialModule } from 'src/app/material/material.module';
import { PrintValeComponent } from './pages/vales/components/printVale/printVale.component';
import { SafePipe } from '../../core/pipes/safe.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CategoriaIndexComponent,
    ProgramaIndexComponent,
    ProyectoIndexComponent,
    ActividadIndexComponent,
    ProveedorIndexComponent,
    ArticuloIndexComponent,
    ArticuloCreateComponent,
    CompraCreateComponent,
    CompraIndexComponent,
    EgresoIndexComponent,
    EgresoCreateComponent,
    CompraUpdateComponent,
    MedidaIndexComponent,
    MedidaEditComponent,
    VehiculoIndexComponent,
    ReportIndexComponent,
    ReportIngresoComponent,
    ReportEntradasComponent,
    ReportArticulosComponent,
    CatPrograIndexComponent,
    EgresoUpdateComponent,
    ReportFisicoValoradoComponent,
    ValeListAutorizacionComponent,
    ValeIndexComponent,
    ValeCreateComponent,
    ValeUpdateComponent,
    ValeNewComponent,
    ValeLubriComponent,
    PrintValeComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FormsModule,
    NgxPrintModule,
    LoaderDirective,
    MaterialModule
  ]
})
export class AlmacenModule { }
