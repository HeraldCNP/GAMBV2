import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HojaRutaRoutingModule } from './hoja-ruta-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OfficeIndexComponent } from './pages/myOffice/office-index/office-index.component';
import { DerivarSeguimientoComponent } from './pages/derivar-seguimiento/derivar-seguimiento.component';
import { HojarutasComponent } from './pages/hojarutas/hojarutas.component';
import { HomeComponent } from './pages/home/home.component';
import { AsociarComponent } from './pages/asociar/asociar.component';
import { EditHojaComponent } from './pages/edit-hoja/edit-hoja.component';
import { ListAsociadosComponent } from './pages/list-asociados/list-asociados.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';
import { SendArchivoOfiComponent } from './pages/send-archivo-ofi/send-archivo-ofi.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { Report1OrderPipe } from './pages/report1-order.pipe';
import { ReportComponent } from './pages/report/report.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ReporteComponent } from './pages/report/reporte/reporte.component';
import { NgxPrintModule } from 'ngx-print';
import { LoaderDirective } from 'src/app/core/directives/loader.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    OfficeIndexComponent,
    DerivarSeguimientoComponent,
    HojarutasComponent,
    HomeComponent,
    AsociarComponent,
    EditHojaComponent,
    ListAsociadosComponent,
    PendientesComponent,
    SendArchivoOfiComponent,
    ReportesComponent,
    Report1OrderPipe,
    ReportComponent,
    ReporteComponent
  ],
  imports: [
    CommonModule,
    HojaRutaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    NgxPrintModule,
    LoaderDirective
  ]
})
export class HojaRutaModule { }
