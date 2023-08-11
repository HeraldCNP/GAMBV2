import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivosRoutingModule } from './archivos-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CarpetaIndexComponent } from './pages/carpetas/carpeta-index/carpeta-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarpetaCreateComponent } from './pages/carpetas/carpeta-create/carpeta-create.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ContaIndexComponent } from './pages/conta/conta-index/conta-index.component';
import { DocIndexComponent } from './pages/conta/doc-index/doc-index.component';
import { PrevenCreateComponent } from './pages/conta/docs/preven/preven-create/preven-create.component';
import { DevenCreateComponent } from './pages/conta/docs/deven/deven-create/deven-create.component';
import { PrevenListComponent } from './pages/conta/docs/preven/preven-list/preven-list.component';
import { AreaIndexComponent } from './pages/areas/area-index/area-index.component';
import { DocEditComponent } from './pages/conta/doc-edit/doc-edit.component';
import { PrevenEditComponent } from './pages/conta/docs/preven/preven-edit/preven-edit.component';
import { DevenListComponent } from './pages/conta/docs/deven/deven-list/deven-list.component';
import { DevenEditComponent } from './pages/conta/docs/deven/deven-edit/deven-edit.component';
import { FinanListComponent } from './pages/conta/docs/finan/finan-list/finan-list.component';
import { FinanCreateComponent } from './pages/conta/docs/finan/finan-create/finan-create.component';
import { RecursoDevenCreateComponent } from './pages/conta/docs/recursos/cip/recurso-deven-create/recurso-deven-create.component';
import { RecursoDevenListComponent } from './pages/conta/docs/recursos/cip/recurso-deven-list/recurso-deven-list.component';
import { RecursoDevenEditComponent } from './pages/conta/docs/recursos/cip/recurso-deven-edit/recurso-deven-edit.component';
import { SipCreateComponent } from './pages/conta/docs/recursos/sip/sip-create/sip-create.component';
import { SipListComponent } from './pages/conta/docs/recursos/sip/sip-list/sip-list.component';
import { SipEditComponent } from './pages/conta/docs/recursos/sip/sip-edit/sip-edit.component';
import { FinanEditComponent } from './pages/conta/docs/finan/finan-edit/finan-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CarpetaIndexComponent,
    CarpetaCreateComponent,
    ContaIndexComponent,
    DocIndexComponent,
    PrevenCreateComponent,
    DevenCreateComponent,
    PrevenListComponent,
    AreaIndexComponent,
    DocEditComponent,
    PrevenEditComponent,
    DevenListComponent,
    DevenEditComponent,
    FinanListComponent,
    FinanCreateComponent,
    RecursoDevenCreateComponent,
    RecursoDevenListComponent,
    RecursoDevenEditComponent,
    SipCreateComponent,
    SipListComponent,
    SipEditComponent,
    FinanEditComponent
  ],
  imports: [
    CommonModule,
    ArchivosRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FormsModule,
  ]
})
export class ArchivosModule { }
