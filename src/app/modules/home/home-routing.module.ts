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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
