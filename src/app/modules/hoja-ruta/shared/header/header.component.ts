import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ComunicacionesService } from '../../services/comunicaciones.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchString: string = "";

  user: any;
  data: any;
  searchForm: any;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private comunicacionesService: ComunicacionesService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }

  cerrarSesion() {
    localStorage.removeItem('user');
    this.cookieService.delete('token');
    this.router.navigate(['/'])
  }

  goSearch() {
    this.router.navigate(['/ruta/hojaRutas', this.searchForm.value.search]);
  }

  enviar() {
    this.comunicacionesService.termino.emit(this.searchForm.value.search);
  }


  focusInput() {
    this.router.navigate(['ruta/hojaRutas']);
  }

  deleteText() {
    this.searchForm.value.search = '';
  }

  buscar(form:any){
    console.log(form);
    let termino = form.search
    this.comunicacionesService.termino.emit(termino);
  }
}
