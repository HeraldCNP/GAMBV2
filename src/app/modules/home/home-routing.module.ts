import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { PostComponent } from './pages/post/post.component';
import { NewsComponent } from './pages/news/news.component';
import { CategoryComponent } from './pages/category/category.component';
import { NewComponent } from './pages/index/new/new.component';
import { MisionComponent } from './pages/mision/mision.component';
import { ObjetivoComponent } from './pages/objetivo/objetivo.component';
import { HistoriaComponent } from './pages/historia/historia.component';
import { AlcaldeComponent } from './pages/alcalde/alcalde.component';
import { ConsejoComponent } from './pages/consejo/consejo.component';
import { DefensoriaComponent } from './pages/defensoria/defensoria.component';
import { SlimComponent } from './pages/slim/slim.component';
import { GacetaComponent } from './pages/gaceta/gaceta.component';
import { PoaComponent } from './pages/gestion/poa/poa.component';
import { RendicionComponent } from './pages/itemTransparencia/rendicion/rendicion.component';
import { PtdiComponent } from './pages/gestion/ptdi/ptdi.component';
import { PeiComponent } from './pages/gestion/pei/pei.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children:[
      // {path: '', component: IndexComponent},
      {path: 'post/:id', component: PostComponent},
      {path: 'category/:name', component: CategoryComponent},
      {path: 'news', component: NewsComponent},
      {path: 'new', component: NewComponent},
      {path: 'mision', component: MisionComponent},
      {path: 'objetivo', component: ObjetivoComponent},
      {path: 'historia', component: HistoriaComponent},
      {path: 'alcalde', component: AlcaldeComponent},
      {path: 'concejo', component: ConsejoComponent},
      {path: 'defensoria', component: DefensoriaComponent},
      {path: 'slim', component: SlimComponent},
      {path: 'gaceta', component: GacetaComponent},
      {path: 'gestion/poa', component: PoaComponent},
      {path: 'gestion/ptdi', component: PtdiComponent},
      {path: 'gestion/pei', component: PeiComponent},

      {path: 'transparencia/rendicion-de-cuentas', component: RendicionComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
