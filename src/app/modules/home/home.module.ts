import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SliderComponent } from './pages/slider/slider.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SecretariesComponent } from './pages/secretaries/secretaries.component';
import { NewsComponent } from './pages/news/news.component';
import { PostComponent } from './pages/post/post.component';
import { AsideComponent } from './pages/post/aside/aside.component';


@NgModule({
  declarations: [
    IndexComponent,
    MenuComponent,
    SliderComponent,
    FooterComponent,
    SecretariesComponent,
    NewsComponent,
    PostComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
