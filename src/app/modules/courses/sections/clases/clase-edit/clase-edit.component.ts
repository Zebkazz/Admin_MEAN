import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseClasesService } from '../../../service/course-clases.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-clase-edit',
  templateUrl: './clase-edit.component.html',
  styleUrls: ['./clase-edit.component.scss']
})
export class ClaseEditComponent implements OnInit {

  @Input() CLASE:any; 
  @Output() ClaseE: EventEmitter<any> = new EventEmitter(); 

  title:any = '';
  description:any = '';
  state:number = 1;

  FILE_VIDEO:any = null;
  FILE_DOCUMENT:any = null;
  FILES: any = [];
  loadvideo:boolean = true;
  link_video_vimeo:any = null;
  DOCUMENT_NAME:any = null;
  DOCUMENT_SIZE:any = null;
  constructor(
    public modal: NgbActiveModal,
    public courseClaseService: CourseClasesService,
    public toaster: Toaster,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.title = this.CLASE.title;
    this.state = this.CLASE.state;
    this.description = this.CLASE.description;
    this.link_video_vimeo = this.CLASE.vimeo_id;
    this.FILES = this.CLASE.files;
  }

  onChange($event:any){
    this.description = $event.editor.getData();
  }
  
  save(){
    if(!this.title){
      this.toaster.open({text: 'EL TITULO ES NECESARIO PARA REGISTRAR UNA SECCIÓN',caption: 'VALIDACIÓN',type: 'danger'});
      return;
    }
    let data = {
      title: this.title,
      state: this.state,
      _id: this.CLASE._id,
    }
    this.courseClaseService.updateClase(data).subscribe((resp:any) => {
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text,caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.modal.close();
        this.ClaseE.emit(resp.clase);
        this.toaster.open({text: "LA CLASE SE HA EDITADO CORRECTAMENTE",caption: 'VALIDACIÓN',type: 'primary'});
      }
    })
  }

  processVideo($event:any){
    this.FILE_VIDEO = $event.target.files[0];
  }

  processFile ($event:any){
    console.log( $event.target.files[0]);
    this.FILE_DOCUMENT = $event.target.files[0];
    this.DOCUMENT_NAME = this.FILE_DOCUMENT.name;
    this.DOCUMENT_SIZE = this.FILE_DOCUMENT.size;
  }

  uploadVimeo(){
    if(!this.FILE_VIDEO){
        this.toaster.open({text: 'SIN NINGUN VIDEO , NO PUEDO SUBIR A VIMEO', caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }
    let formData = new FormData();
    formData.append("video",this.FILE_VIDEO);
    formData.append("_id",this.CLASE._id);
    this.loadvideo = false;
    this.courseClaseService.uploadVimeo(formData).subscribe((resp:any) => {
      console.log(resp);
      this.loadvideo = true;
      this.link_video_vimeo = resp.vimeo_id;
      this.toaster.open({text: 'EL VIDEO TRAILER SE SUBIO CON EXITO', caption: 'VALIDACIÓN', type: 'primary'});
    })
  }

  uploadFile(){
    if(!this.FILE_DOCUMENT){
      this.toaster.open({text: 'SIN NINGUN ARCHIVO , NO PUEDO SUBIR EL RECURSO', caption: 'VALIDACIÓN', type: 'danger'});
      return;
    }
    let formData = new FormData();
    formData.append("recurso",this.FILE_DOCUMENT);
    formData.append("clase",this.CLASE._id);
    formData.append("file_name",this.DOCUMENT_NAME);
    formData.append("size",this.DOCUMENT_SIZE);

    this.loadvideo = false;
    this.courseClaseService.uploadFile(formData).subscribe((resp:any) => {
      console.log(resp);
      this.loadvideo = true;
      this.FILES.unshift(resp.file);
      this.FILE_DOCUMENT = null;
      this.DOCUMENT_NAME = null;
      this.DOCUMENT_SIZE = null;
      this.toaster.open({text: 'EL RECURSO SE SUBIO CON EXITO', caption: 'VALIDACIÓN', type: 'primary'});
    })
  }
  deleteFile(FILE:any){
    this.loadvideo = false;
    this.courseClaseService.removeClaseFile(FILE._id).subscribe((resp:any) => {
      console.log(resp);
      this.loadvideo = true;

      let INDEX = this.FILES.findIndex((item:any) => item._id == FILE._id);

      if(INDEX != -1){
        this.FILES.splice(INDEX,1);
      }

      this.toaster.open({text: 'EL RECURSO SE ELIMINO CON EXITO', caption: 'VALIDACIÓN', type: 'primary'});
    })
  }
  urlVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_vimeo);
  }

}
