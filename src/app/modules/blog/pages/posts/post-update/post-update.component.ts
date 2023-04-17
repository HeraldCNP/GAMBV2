import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import Swal from 'sweetalert2';
import { Editor, Toolbar } from 'ngx-editor';


@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute, private router: Router, private api: BlogService) { }

  idUser: any;
  user: any;
  data: any;
  files: any = '';
  URL = environment.api;
  datosPost: any;
  postId: any;
  categories: any = [];
  progress: number = 0;
  editor: any = Editor;
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
  placeholder: string = '';

  editarForm: any = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    iframe: new FormControl(''),
    category: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    image: new FormControl('')
  })
  urlYoutube: string = "https://www.youtube.com/embed/";

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.idUser = this.data.id;
    this.getCategories(),
    this.postId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSinglePost(this.postId).subscribe(data => {
      this.datosPost = data.serverResponse;
      // console.log(data);
      console.log(this.datosPost);
      if (this.datosPost.iframe === undefined) {
        this.editarForm.setValue({
          'title': this.datosPost.title,
          'subtitle': this.datosPost.subtitle,
          'body': this.datosPost.body,
          // 'iframe': this.datosPost.iframe,
          'category': this.datosPost.category,
          'fecha': this.datosPost.fecha.substr(0, 10),
          'image': "",
        });
      } else {
        this.editarForm.setValue({
          'title': this.datosPost.title,
          'subtitle': this.datosPost.subtitle,
          'body': this.datosPost.body,
          'iframe': this.datosPost.iframe,
          'category': this.datosPost.category,
          'fecha': this.datosPost.fecha.substr(0, 10),
          'image': "",
        });
      }
    })
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getCategories() {
    this.api.getAllCategories().subscribe
      (res => {
        this.categories = res;
        // console.log(res);
      });
  }

  get form() {
    return this.editarForm.controls;
  }

  editFormPost() {

    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();


    if (this.editarForm.value.iframe) {
      for (let index = 0; index < this.files.length; index++) {
        const element = this.files[index];
        fd.append('images', element);
      }
      fd.append('title', this.editarForm.value.title);
      fd.append('subtitle', this.editarForm.value.subtitle);
      fd.append('body', this.editarForm.value.body);
      fd.append('iframe', this.editarForm.value.iframe);
      fd.append('category', this.editarForm.value.category);
      fd.append('fecha', this.editarForm.value.fecha);
      fd.append('user', this.idUser);
    } else {
      for (let index = 0; index < this.files.length; index++) {
        const element = this.files[index];
        fd.append('images', element);
      }
      fd.append('title', this.editarForm.value.title);
      fd.append('subtitle', this.editarForm.value.subtitle);
      fd.append('body', this.editarForm.value.body);
      fd.append('category', this.editarForm.value.category);
      fd.append('fecha', this.editarForm.value.fecha);
      fd.append('user', this.idUser);
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

  deleteImage(id:string){
    console.log(id)
    this.api.deleteImage(id).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => window.location.reload()
    );
  }


  onChange($event: any) {
    this.files = $event.target.files;
  }
  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }
}
