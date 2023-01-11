import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GacetaRoutingModule } from './gaceta-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSelectModule } from 'ngx-select-ex';
import { GacetaIndexComponent } from './pages/gaceta/gaceta-index/gaceta-index.component';
import { GacetaCreateComponent } from './pages/gaceta/gaceta-create/gaceta-create.component';
import { GacetaUpdateComponent } from './pages/gaceta/gaceta-update/gaceta-update.component';
import { PoaIndexComponent } from './pages/poa/poa-index/poa-index.component';
import { PoaCreateComponent } from './pages/poa/poa-create/poa-create.component';
import { PoaUpdateComponent } from './pages/poa/poa-update/poa-update.component';
import { PtdiCreateComponent } from './pages/ptdi/ptdi-create/ptdi-create.component';
import { PtdiIndexComponent } from './pages/ptdi/ptdi-index/ptdi-index.component';
import { PtdiUpdateComponent } from './pages/ptdi/ptdi-update/ptdi-update.component';




@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    

    GacetaCreateComponent,
    GacetaIndexComponent,
    GacetaUpdateComponent,
    PoaIndexComponent,
    PoaCreateComponent,
    PoaUpdateComponent,
    PtdiCreateComponent,
    PtdiIndexComponent,
    PtdiUpdateComponent
  ],
  imports: [
    CommonModule,
    GacetaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
  ]
})
export class GacetaModule { }
