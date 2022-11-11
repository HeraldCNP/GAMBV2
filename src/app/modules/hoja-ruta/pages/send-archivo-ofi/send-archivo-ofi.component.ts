import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { RutaService } from '../../services/ruta.service';
import { Segui } from '../../models/seguimiento';
import { Hojaruta } from '../../models/hojaruta';
@Component({
  selector: 'app-send-archivo-ofi',
  templateUrl: './send-archivo-ofi.component.html',
  styleUrls: ['./send-archivo-ofi.component.css']
})
export class SendArchivoOfiComponent implements OnInit {
  derivarForm: FormGroup = new FormGroup({});
  titulo = 'derivar documento';
  constructor() { }

  ngOnInit(): void {
  }
  SendFile(){

  }
}
