import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  user: any;
  data: any;
  constructor(private cookieService: CookieService,
    private router: Router,
    private authService: AuthService) { }

  itemsMenu = [
    { label: 'Aplicaciones', url: '/dashboard/main', icon: 'fas fa-laptop-code' },
    { label: 'Plantillas', url: '/dashboard/plantillas', icon: 'fas fa-file-alt' },
    { label: 'Normativas', url: '/dashboard/normativas', icon: 'fas fa-file-contract' },
    { label: 'Planificación', url: '/dashboard/planificacion', icon: 'fas fa-chart-pie' },
    { label: 'Materiales y Suministros', url: '/dashboard/solicitud-materiales', icon: 'fas fa-mail-bulk' },
  ]

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }

  cerrarSesion(){
    this.authService.logout()
  }



}
