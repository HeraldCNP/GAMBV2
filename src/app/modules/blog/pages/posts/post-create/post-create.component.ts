import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  files:any = [];
  categories:any = [];
  URL = environment.api;
  progress: number = 0;
  urlYoutube:string = "https://www.youtube.com/embed/";
  constructor(
    private api: BlogService,
    private router: Router
  ) { }

  editor:any = Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  placeholder:string = '';

  ngOnInit(): void {
    this.createform(),
    this.getCategories()
    this.editor = new Editor();
  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createform(){
    this.postForm = new FormGroup({
      title : new FormControl('', [Validators.required, Validators.minLength(6)]),
      subtitle : new FormControl('', [Validators.required, Validators.minLength(6)]),
      body : new FormControl('', [Validators.required, Validators.minLength(15)]),
      iframe : new FormControl('', [Validators.minLength(5)]),
      category : new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    })
  }

  get form() {
    return this.postForm.controls;
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
    for (let index = 0; index < this.files.length; index++) {
      const element = this.files[index];
      fd.append('images', element);
    }


    fd.append('title', this.postForm.value.title);
    fd.append('subtitle', this.postForm.value.subtitle);
    fd.append('body', this.postForm.value.body);
    fd.append('iframe', this.urlYoutube+this.postForm.value.iframe);
    fd.append('category', this.postForm.value.category);
    console.log(fd.get('images')?.valueOf())
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
