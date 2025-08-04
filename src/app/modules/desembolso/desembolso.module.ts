import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesembolsoRoutingModule } from './desembolso-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoFondoComponent } from './pages/tipoFondo/tipoFondo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesembolosoFondosComponent } from './pages/desembolosoFondos/desembolosoFondos.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FuentesComponent } from './pages/fuentes/fuentes.component';
import { GastoFondoComponent } from './pages/gastoFondo/gastoFondo.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TipoFondoComponent,
    DashboardComponent,
    DesembolosoFondosComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    FuentesComponent,
    GastoFondoComponent,

  ],
  imports: [
    CommonModule,
    DesembolsoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    SharedModule
  ]
})
export class DesembolsoModule { }

