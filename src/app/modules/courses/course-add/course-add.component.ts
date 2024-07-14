import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

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

  requirement_text:string = '';
  requirements:any = [];
  who_is_for_text:string = '';
  who_is_it_for:any = [];

  constructor(
    public CourseService: CoursesService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.CourseService.isLoading$;
    this.CourseService.ConfigAll().subscribe((resp:any) => {
      console.log(resp);
      this.CATEGORIES = resp.categories;
      this.USERS = resp.users;
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
      this.who_is_it_for.length == 0 || !this.FILE_IMAGEN){
        this.toaster.open({text: 'NECESITAS INGRESAR TODOS LOS CAMPOS DEL FORMULARIO DE CURSO', caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let formData = new FormData();

    formData.append("title",this.title);
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
    formData.append("portada",this.FILE_IMAGEN);

    this.CourseService.registerCourses(formData).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text , caption: 'VALIDACIÓN', type: 'danger' })
        return;
      }else{
        this.title = '';
        this.subtitle = '';
        this.price_soles = 0;
        this.price_usd = 0;
        this.categorie  = '';
        this.level  = '';
        this.idioma  = '';
        this.user  = '';
        this.description  = '';
        this.requirements = [];
        this.who_is_it_for = [];
        this.FILE_IMAGEN = null;
        this.IMAGEN_PREVIZUALIZAR = null;
        this.toaster.open({text: resp.message , caption: 'VALIDACIÓN', type: 'primary' })
      }
    })
  }
}
