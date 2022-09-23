import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SliderCreateComponent } from './pages/slider/slider-create/slider-create.component';
import { SliderIndexComponent } from './pages/slider/slider-index/slider-index.component';
import { SliderUpdateComponent } from './pages/slider/slider-update/slider-update.component';
import { PostCreateComponent } from './pages/posts/post-create/post-create.component';
import { PostIndexComponent } from './pages/posts/post-index/post-index.component';
import { PostUpdateComponent } from './pages/posts/post-update/post-update.component';
import { CategoryIndexComponent } from './pages/categories/category-index/category-index.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SliderCreateComponent,
    SliderIndexComponent,
    SliderUpdateComponent,
    PostCreateComponent,
    PostIndexComponent,
    PostUpdateComponent,
    CategoryIndexComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
