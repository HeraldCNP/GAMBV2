import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute, private router: Router, private api:BlogService) { }

  files:any = '';
  URL = environment.api;
  datosPost :any;
  postId: any;
  categories:any = [];

  editarForm:any = new FormGroup({
      title : new FormControl('', Validators.required),
      subtitle : new FormControl('', Validators.required),
      body : new FormControl('', Validators.required),
      iframe : new FormControl(''),
      category : new FormControl('', Validators.required),
      image: new FormControl('')
  })

  ngOnInit(): void {
    this.getCategories(),
    this.postId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSinglePost(this.postId).subscribe(data => {
      this.datosPost = data.serverResponse;
      // console.log(this.datosPost);
      this.editarForm.setValue({
        'title': this.datosPost.title,
        'subtitle': this.datosPost.subtitle,
        'body': this.datosPost.body,
        'iframe': this.datosPost.iframe,
        'category': this.datosPost.category,
        'image': this.datosPost.uri,
      });
      
    })
  }

  getCategories(){
    this.api.getAllCategories().subscribe
    (res => {
      this.categories = res; 
      // console.log(res);
    });
  }

  editFormPost(){

    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    
    if(typeof(this.files[0]) == 'object'){
      fd.append('title', this.editarForm.value.title);
      fd.append('subtitle', this.editarForm.value.subtitle);
      fd.append('body', this.editarForm.value.body);
      fd.append('iframe', this.editarForm.value.iframe);
      fd.append('category', this.editarForm.value.category);
      fd.append('image', this.files[0]);
    }else{
      fd.append('title', this.editarForm.value.title);
      fd.append('subtitle', this.editarForm.value.subtitle);
      fd.append('body', this.editarForm.value.body);
      fd.append('iframe', this.editarForm.value.iframe);
      fd.append('category', this.editarForm.value.category);
      fd.append('image', this.files[0]);
    }
    
    this.api.sendUpdatePost(fd, this.postId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['blog/post/index']),
        this.alertOk('success', 'Exito', 'Post Editado Correctamente', '2000')
      }
    );

  }


  onChange($event:any) {
    this.files = $event.target.files;
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
