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
      label: 'Modelos',
      url: '/doc/modelos/index'
    },
    {
      label: 'Documentos',
      url: '/doc/documentos/index'
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
