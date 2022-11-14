import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchString: string="";

  user:any;
  data:any;

  constructor(
    private cookieService: CookieService,
    private router: Router
    
    ) { 
   
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }




  cerrarSesion(){
    localStorage.removeItem('user');
    this.cookieService.delete('token');
    this.router.navigate(['/'])
  }
  goSearch(){
    this.router.navigate(['/ruta/hojaRutas', this.searchString]);
  }
}
