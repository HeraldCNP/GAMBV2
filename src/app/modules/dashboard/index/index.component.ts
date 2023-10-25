import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  user: any;
  data: any;
  constructor(private cookieService: CookieService,
    private router: Router) { }

  itemsMenu = [
    { label: 'Aplicaciones', url: '/dashboard/main', icon: 'fas fa-laptop-code' },
    { label: 'Plantillas', url: '/dashboard/plantillas', icon: 'fas fa-file-alt' },
    { label: 'Normativas', url: '/dashboard/normativas', icon: 'fas fa-file-contract' },
  ]

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
