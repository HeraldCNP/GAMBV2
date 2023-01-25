import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriaIndexComponent } from './pages/categorias/categoria-index/categoria-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramaIndexComponent } from './pages/programas/programa-index/programa-index.component';
import { ProyectoIndexComponent } from './pages/proyectos/proyecto-index/proyecto-index.component';
import { ActividadIndexComponent } from './pages/actividades/actividad-index/actividad-index.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ProveedorIndexComponent } from './pages/proveedores/proveedor-index/proveedor-index.component';
import { ArticuloIndexComponent } from './pages/articulos/articulo-index/articulo-index.component';




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
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
  ]
})
export class AlmacenModule { }
