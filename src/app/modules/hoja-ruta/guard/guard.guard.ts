import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RutaService } from '../services/ruta.service';
import { OfficeIndexComponent } from '../pages/myOffice/office-index/office-index.component';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard  {
  
  constructor(
    private RutaService: OfficeIndexComponent,
    private router: Router
  ) { }


  canActivate(): boolean {
    if (this.RutaService.pendintes()) {
      return true;
    }

    this.router.navigate(['/ruta/pendientes']);
    return false;
  }
  
}
