import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CoursesService } from '../service/courses.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  CATEGORIES:any = [];
  USERS:any = [];

  isLoading$:any;
  
  FILE_IMAGEN:any;
  IMAGEN_PREVIZUALIZAR:any = '';


  title:string = '';
  subtitle:string = '';
  price_soles:number = 0;
  price_usd:number = 0;
  categorie:string = '';
  level:string = '';
  idioma:string = '';
  user:string = '';
  description:any = '';
  state:any = '';

  requirement_text:string = '';
  requirements:any = [];
  who_is_for_text:string = '';
  who_is_it_for:any = [];

  course_id:any = null;

  COURSE_SELECTED:any = null;
  // 
  FILE_VIDEO:any = null;
  loadvideo:boolean = true;
  link_video_vimeo:any = null;
  constructor(
    public CourseService: CoursesService,
    public toaster: Toaster,
    public activedRouter: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.CourseService.isLoading$;
    this.activedRouter.params.subscribe((resp:any) => {
      console.log(resp);
      this.course_id = resp.id;
    })
    this.CourseService.ConfigAll().subscribe((resp:any) => {
      console.log(resp);
      this.CATEGORIES = resp.categories;
      this.USERS = resp.users;

      this.CourseService.showCourse(this.course_id).subscribe((resp:any) => {
        console.log(resp);
        this.COURSE_SELECTED = resp.course;

        this.IMAGEN_PREVIZUALIZAR = this.COURSE_SELECTED.imagen;
        this.title = this.COURSE_SELECTED.title;
        this.subtitle = this.COURSE_SELECTED.subtitle;
        this.price_soles = this.COURSE_SELECTED.price_soles;
        this.price_usd = this.COURSE_SELECTED.price_usd;
        this.categorie = this.COURSE_SELECTED.categorie._id;
        this.level = this.COURSE_SELECTED.level;
        this.idioma = this.COURSE_SELECTED.idioma;
        this.user = this.COURSE_SELECTED.user._id;
        this.description = this.COURSE_SELECTED.description;
        this.requirements = this.COURSE_SELECTED.requirements;
        this.who_is_it_for = this.COURSE_SELECTED.who_is_it_for;
        this.state = this.COURSE_SELECTED.state;
        this.link_video_vimeo = this.COURSE_SELECTED.vimeo_id;
      })

    })
  }

  processFile($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open({text: 'SOLAMENTE SE ACEPTAN IMAGENES',caption: 'VALIDACIONES',type: 'danger'});
      return;
    }
    this.FILE_IMAGEN = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_IMAGEN);
    reader.onloadend = () => this.IMAGEN_PREVIZUALIZAR = reader.result;
    this.CourseService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.CourseService.isLoadingSubject.next(false);
    }, 100);
  }
  processVideo($event:any){
    this.FILE_VIDEO = $event.target.files[0];
  }
  addRequirement(){
    if(!this.requirement_text){
      this.toaster.open({text: 'EL TEXTO ES REQUERIDO',caption: 'VALIDACIONES',type: 'danger'});
      return;
    }
    this.requirements.push(this.requirement_text);

    setTimeout(() => {
      this.requirement_text = '';

      this.CourseService.isLoadingSubject.next(true);
      setTimeout(() => {
        this.CourseService.isLoadingSubject.next(false);
      }, 50);

    }, 25);
  }
  addWhoIs(){
    if(!this.who_is_for_text){
      this.toaster.open({text: 'EL TEXTO ES REQUERIDO',caption: 'VALIDACIONES',type: 'danger'});
      return;
    }
    this.who_is_it_for.push(this.who_is_for_text);

    setTimeout(() => {
      this.who_is_for_text = '';

      this.CourseService.isLoadingSubject.next(true);
      setTimeout(() => {
        this.CourseService.isLoadingSubject.next(false);
      }, 50);

    }, 25);
  }
  deleteRequire(i:any){
    this.requirements.splice(i,1);
    // this.CourseService.isLoadingSubject.next(true);
    //   setTimeout(() => {
    //     this.CourseService.isLoadingSubject.next(false);
    //   }, 50);
  }
  deleteWhoIs(i:any){
    this.who_is_it_for.splice(i,1);
    // this.CourseService.isLoadingSubject.next(true);
    //   setTimeout(() => {
    //     this.CourseService.isLoadingSubject.next(false);
    //   }, 50);
  }
  onChange($event:any){
    this.description = $event.editor.getData();
  }

  save(){

    if(!this.title || !this.subtitle || !this.price_soles || !this.price_usd || !this.categorie
      || !this.level || !this.idioma || !this.user || !this.description || this.requirements.length == 0 ||
      this.who_is_it_for.length == 0){
        this.toaster.open({text: 'NECESITAS INGRESAR TODOS LOS CAMPOS DEL FORMULARIO DE CURSO', caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let formData = new FormData();

    formData.append("_id",this.course_id);
    formData.append("title",this.title);
    formData.append("state",this.state);
    formData.append("subtitle",this.subtitle);
    formData.append("price_soles",this.price_soles+"");
    formData.append("price_usd",this.price_usd+"");
    formData.append("categorie",this.categorie);
    formData.append("level",this.level);
    formData.append("idioma",this.idioma);
    formData.append("user",this.user);
    formData.append("description",this.description);
    formData.append("requirements", JSON.stringify(this.requirements) );//["text 1","text 2"] "text 1","text 2"
    formData.append("who_is_it_for", JSON.stringify(this.who_is_it_for));
    if(this.FILE_IMAGEN){
      formData.append("portada",this.FILE_IMAGEN);
    }

    this.CourseService.updateCourses(formData).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text , caption: 'VALIDACIÓN', type: 'danger' })
        return;
      }else{
        this.toaster.open({text: resp.message , caption: 'VALIDACIÓN', type: 'primary' })
      }
    })
  }

  uploadVimeo(){
    if(!this.FILE_VIDEO){
        this.toaster.open({text: 'SIN NINGUN VIDEO , NO PUEDO SUBIR A VIMEO', caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }
    let formData = new FormData();
    formData.append("video",this.FILE_VIDEO);
    formData.append("_id",this.course_id);
    this.loadvideo = false;
    this.CourseService.uploadVimeo(formData).subscribe((resp:any) => {
      console.log(resp);
      this.loadvideo = true;
      this.link_video_vimeo = resp.vimeo_id;
      this.toaster.open({text: 'EL VIDEO TRAILER SE SUBIO CON EXITO', caption: 'VALIDACIÓN', type: 'primary'});
    })
  }

  urlVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_vimeo);
  }
}