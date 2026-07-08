import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  // standalone: true,
  // imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user:any;
  data:any;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService,
    ) {

  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    // console.log(this.data);
    
  }




  cerrarSesion(){
    this.authService.logout()
  }

}
