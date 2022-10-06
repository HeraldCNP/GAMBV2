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
import { MomentModule } from 'angular2-moment';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    OfficeIndexComponent,
    DerivarSeguimientoComponent,
    HojarutasComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HojaRutaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ]
})
export class HojaRutaModule { }
