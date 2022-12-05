import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  files:any = '';
  URL = environment.api;
  datosUser :any;
  userId: any;

  editarForm:any;

  constructor(
    private activeRouter: ActivatedRoute, 
    private router: Router, 
    private api:AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.userId = this.activeRouter.params.subscribe( ({ id }) =>{
      this.cargarUser(id);
    })

    this.editarForm = this.fb.group({
      ci: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      password: ['', ],
      birthday: ['', ],
      roles: ['', [Validators.required]],
      image:['', [Validators.required]]
    })
    
  }

  cargarUser(id:string){
    this.api.getSingleUser(id).subscribe(usuario => {
      this.datosUser = usuario.serverResponse;
      console.log(this.datosUser);
      const { ci, email, post, roles, surnames, username } = this.datosUser;
      this.editarForm.setValue({
        ci,
        email,
        username,
        surnames,
        roles,
        'password': '',
        'birthday': '',
        'image': '',
      });
      
    })
  }

  editUsuario(form:any){}

  cancel(){}
}
