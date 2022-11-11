import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MisionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
  ]
})
export class HomeModule { }
