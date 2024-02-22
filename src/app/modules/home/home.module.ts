import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { SliderComponent } from './pages/index/slider/slider.component';
import { NewsComponent } from './pages/news/news.component';
import { SecretariesComponent } from './pages/index/secretaries/secretaries.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PostComponent } from './pages/post/post.component';
import { AsideComponent } from './pages/post/aside/aside.component';
import { CategoryComponent } from './pages/category/category.component';
import { NewComponent } from './pages/index/new/new.component';
import { DomseguroPipe } from '../../core/pipes/domseguro.pipe';
import { InfoComponent } from './pages/index/info/info.component';
import { MisionComponent } from './pages/mision/mision.component';
import { ObjetivoComponent } from './pages/objetivo/objetivo.component';
import { HistoriaComponent } from './pages/historia/historia.component';
import { AlcaldeComponent } from './pages/alcalde/alcalde.component';
import { ConsejoComponent } from './pages/consejo/consejo.component';
import { ServiciosComponent } from './pages/index/servicios/servicios.component';
import { DefensoriaComponent } from './pages/defensoria/defensoria.component';
import { SlimComponent } from './pages/slim/slim.component';
import { AmbienteComponent } from './pages/ambiente/ambiente.component';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';
import { TuristicoComponent } from './pages/index/turistico/turistico.component';
import { GacetaComponent } from './pages/gaceta/gaceta.component';
import { PoaComponent } from './pages/gestion/poa/poa.component';
import { PeiComponent } from './pages/gestion/pei/pei.component';
import { PtdiComponent } from './pages/gestion/ptdi/ptdi.component';
import { ConvenioComponent } from './pages/gestion/convenio/convenio.component';
import { ReglamentoComponent } from './pages/gestion/reglamento/reglamento.component';
import { RendicionComponent } from './pages/itemTransparencia/rendicion/rendicion.component';
import { CounterComponent } from './pages/index/counter/counter.component';
import { AuditoriaComponent } from './pages/itemTransparencia/auditoria/auditoria.component';
import { SearchPublicHrComponent } from './pages/index/search-public-hr/search-public-hr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListHrComponent } from './pages/list-hr/list-hr.component';



@NgModule({
  declarations: [
    IndexComponent,
    MenuComponent,
    SliderComponent,
    FooterComponent,
    SecretariesComponent,
    NewsComponent,
    PostComponent,
    AsideComponent,
    CategoryComponent,
    NewComponent,
    DomseguroPipe,
    InfoComponent,
    MisionComponent,
    ObjetivoComponent,
    HistoriaComponent,
    AlcaldeComponent,
    ConsejoComponent,
    ServiciosComponent,
    DefensoriaComponent,
    SlimComponent,
    AmbienteComponent,
    ImpuestosComponent,
    TuristicoComponent,
    GacetaComponent,
    PoaComponent,
    PeiComponent,
    PtdiComponent,
    ConvenioComponent,
    ReglamentoComponent,
    RendicionComponent,
    CounterComponent,
    AuditoriaComponent,
    SearchPublicHrComponent,
    ListHrComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
