import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any;
  data: any;


  menuItems = [
    {
      label: 'Plantillas',
      icon: 'fas fa-file',
      docs: [
        {
          label: 'Modelos',
          url: '/doc/modelos/index'
        },
        {
          label: 'Documentos',
          url: '/doc/documentos/index'
        },
      ]
    },
    {
      label: 'Normativas',
      icon: 'fas fa-file-contract',
      docs: [
        {
          label: 'Tipos',
          url: '/doc/normativas/tipos/index'
        },

        {
          label: 'Documentos',
          url: '/doc/normativas/doc/index'
        },
      ]
    },
    {
      label: 'Prestamos',
      icon: 'fas fa-file-contract',
      docs: [
        {
          label: 'Lista',
          url: '/doc/prestamos/index'
        },
      ]
    },
    {
      label: 'Ejecución Presupuestaria',
      icon: 'fas fa-file-contract',
      docs: [
        {
          label: 'Ejecución Presupuestaria',
          url: '/doc/ejecucion-presupuestaria/index'
        },
      ]
    },
    {
      label: 'Seguimiento y Evaluación',
      icon: 'fas fa-file-contract',
      docs: [
        {
          label: 'Seguimiento y Evaluación',
          url: '/doc/evaluacion/index'
        },
      ]
    },



  ];

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }

  cerrarSesion(){
    this.authService.logout()
  }


}
