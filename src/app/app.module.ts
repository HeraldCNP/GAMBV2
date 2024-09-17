import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import {NgxPrintModule} from 'ngx-print';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { LoaderDirective } from './core/directives/loader.directive';


registerLocaleData(localeEs, 'es');
@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LoaderDirective,
        NgxPrintModule], providers: [
        CookieService,
        { provide: LOCALE_ID, useValue: 'es' },
        provideHttpClient(withInterceptorsFromDi(), withInterceptors([loaderInterceptor])),
    ] })
export class AppModule { }
