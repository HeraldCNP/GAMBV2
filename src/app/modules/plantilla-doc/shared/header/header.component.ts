import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  ];

  constructor(
    private cookieService: CookieService,
    private router: Router

  ) {

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


}
