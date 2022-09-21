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
    NewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
