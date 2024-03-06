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


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    AutorizacionIndexComponent,
    AutorizacionCreateComponent,
    AutorizacionUpdateComponent
  ],
  imports: [
    CommonModule,
    ActFijosRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FormsModule,
    NgxPrintModule,
  ]
})
export class ActFijosModule { }
