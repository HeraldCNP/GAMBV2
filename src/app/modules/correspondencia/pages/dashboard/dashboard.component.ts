import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClient } from '@angular/common/http';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, merge, Observable, startWith, switchMap } from 'rxjs';
import { CorrespondenciasService } from '../../services/correspondencias.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterModule, CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  

}

