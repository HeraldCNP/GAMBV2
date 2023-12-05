import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ComunicacionesService } from '../../services/comunicaciones.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

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
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }

  cerrarSesion(){
    this.authService.logout()
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
