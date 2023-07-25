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
    PrevenEditComponent
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
