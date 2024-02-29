import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './modules/auth/pages/private/private.component';
import { SessionGuard } from './core/guards/session.guard';

import { PostComponent } from './modules/home/pages/post/post.component';
import { LoginComponent } from './login/login.component';
import { HojaRutaModule } from './modules/hoja-ruta/hoja-ruta.module';
import { ActFijosModule } from './modules/act-fijos/act-fijos.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [SessionGuard]
  },
  // {
  //   path: 'post',
  //   component: PostComponent,
  //   // canActivate: [SessionGuard]
  // },
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'ruta',
    loadChildren: () => import('./modules/hoja-ruta/hoja-ruta.module').then(m => m.HojaRutaModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'convenio',
    loadChildren: () => import('./modules/convenio/convenio.module').then(m => m.ConvenioModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'docAdmin',
    loadChildren: () => import('./modules/gaceta/gaceta.module').then(m => m.GacetaModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'almacen',
    loadChildren: () => import('./modules/almacen/almacen.module').then(m => m.AlmacenModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'archivos',
    loadChildren: () => import('./modules/archivos/archivos.module').then(m => m.ArchivosModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'doc',
    loadChildren: () => import('./modules/plantilla-doc/plantilla-doc.module').then(m => m.PlantillaDocModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'actFijos',
    loadChildren: () => import('./modules/act-fijos/act-fijos.module').then(m => m.ActFijosModule),
    canActivate: [SessionGuard]
  },
  {
    path: '**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
