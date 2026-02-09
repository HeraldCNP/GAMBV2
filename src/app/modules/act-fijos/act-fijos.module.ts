import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActFijosRoutingModule } from './act-fijos-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AutorizacionIndexComponent } from './pages/autorizaciones/autorizacion-index/autorizacion-index.component';
import { AutorizacionCreateComponent } from './pages/autorizaciones/autorizacion-create/autorizacion-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxPrintModule } from 'ngx-print';
import { AutorizacionUpdateComponent } from './pages/autorizaciones/autorizacion-update/autorizacion-update.component';
import { LoaderDirective } from 'src/app/core/directives/loader.directive';
import { Gastos } from './pages/gastos/gastos';
import { ListOrden } from './pages/ordenes/listOrden/listOrden';
import { NewOrden } from './pages/ordenes/newOrden/newOrden';
import { SharedModule } from "../../shared/shared.module";
import { AddGasto } from './pages/addGasto/addGasto';
import { GastoReport } from './pages/gastoReport/gastoReport';
import { GastoEdit } from './pages/gastoEdit/gastoEdit';


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    AutorizacionIndexComponent,
    AutorizacionCreateComponent,
    AutorizacionUpdateComponent,
    Gastos,
    ListOrden,
    NewOrden,
    AddGasto,
    GastoReport,
    GastoEdit
  ],
  imports: [
    CommonModule,
    ActFijosRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FormsModule,
    NgxPrintModule,
    LoaderDirective,
    SharedModule
]
})
export class ActFijosModule { }
