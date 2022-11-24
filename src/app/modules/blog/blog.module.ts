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
import { NgxEditorModule } from 'ngx-editor';



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
    ReactiveFormsModule,
    NgxEditorModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
  ]
})
export class BlogModule { }
