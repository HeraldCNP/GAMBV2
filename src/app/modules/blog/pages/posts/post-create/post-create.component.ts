import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  files:any;
  categories:any = [];
  URL = environment.api;
  progress: number = 0;
  constructor(
    private api: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createform(),
    this.getCategories()
  }

  createform(){
    this.postForm = new FormGroup({
      title : new FormControl('', Validators.required),
      subtitle : new FormControl('', Validators.required),
      body : new FormControl('', Validators.required),
      iframe : new FormControl(''),
      category : new FormControl('', Validators.required),
      image: new FormControl('')
    })
  }

  
  getCategories(){
    this.api.getAllCategories().subscribe
    (res => {
      this.categories = res; 
      // console.log(res);
    });
  }

  onChange($event:any) {
    this.files = $event.target.files;
  }

  sendFormPost(){
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    fd.append('image', this.files[0]);
    fd.append('title', this.postForm.value.title);
    fd.append('subtitle', this.postForm.value.subtitle);
    fd.append('body', this.postForm.value.body);
    fd.append('iframe', this.postForm.value.iframe);
    fd.append('category', this.postForm.value.category);

  
    this.api.registerPost(fd).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
    },
    err => {
      console.log('HTTP Error', err)
      this.progress = 0;
    },
    () => {
            this.progress = 0;
            this.router.navigate(['blog/post/index']),
            this.alertOk('success', 'Exito', 'Post Creado Correctamente', '2000')
          }
    )
  }



  alertOk(icon:any, title:any, text:any, timer:any){
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }


}
