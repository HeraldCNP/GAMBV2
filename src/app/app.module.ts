import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import {NgxPrintModule} from 'ngx-print';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


registerLocaleData(localeEs, 'es');
@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxPrintModule], providers: [
        CookieService,
        { provide: LOCALE_ID, useValue: 'es' },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
