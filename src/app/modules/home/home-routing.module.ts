import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { PostComponent } from './pages/post/post.component';
import { NewsComponent } from './pages/news/news.component';

const routes: Routes = [
  {
    path: '', 
    component: IndexComponent,
    children:[
      // {path: '', component: IndexComponent},
      {path: 'post/:id', component: PostComponent},
      {path: 'news', component: NewsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
