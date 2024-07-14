import { Component, OnInit } from '@angular/core';
import { ClaseEditComponent } from '../clase-edit/clase-edit.component';
import { ClaseDeleteComponent } from '../clase-delete/clase-delete.component';
import { CourseClasesService } from '../../../service/course-clases.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-clase-add',
  templateUrl: './clase-add.component.html',
  styleUrls: ['./clase-add.component.scss']
})
export class ClaseAddComponent implements OnInit {

  isLoading$:any;

  title:any = '';
  section_id:any = '';
  description:any = '';

  CLASES:any = [];
  constructor(
    public courseClaseService: CourseClasesService,
    public activedRouter: ActivatedRoute,
    public toaster: Toaster,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ =  this.courseClaseService.isLoading$;
    this.activedRouter.params.subscribe((resp:any) => {
      this.section_id = resp.id;
    })

    this.courseClaseService.listClases(this.section_id).subscribe((resp:any) => {
      console.log(resp);
      this.CLASES = resp.clases;
    })
  }

  onChange($event:any){
    this.description = $event.editor.getData();
  }

  save(){
    if(!this.title || !this.description){
      this.toaster.open({text: 'EL TITULO Y LA DESCRIPCIÓN ES NECESARIO PARA REGISTRAR UNA CLASE',caption: 'VALIDACIÓN',type: 'danger'});
      return;
    }
    let data = {
      section: this.section_id,
      title: this.title,
      description: this.description,
    }
    this.courseClaseService.registerClase(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text,caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.title = '';
        this.description = '';
        this.CLASES.unshift(resp.clase);
        this.toaster.open({text: "LA CLASE SE HA REGISTRADO CORRECTAMENTE",caption: 'VALIDACIÓN',type: 'primary'});
      }
    })
  }

  editClase(CLASE:any){
    const modalref = this.modalService.open(ClaseEditComponent,{size: 'md', centered: true});
    modalref.componentInstance.CLASE = CLASE;

    modalref.componentInstance.ClaseE.subscribe((EditClase:any) => {
      let INDEX = this.CLASES.findIndex((item:any) => item._id == EditClase._id);
      if(INDEX != -1){
        this.CLASES[INDEX] = EditClase;
      }
    })
  }

  deleteClase(CLASE:any){
    const modalref = this.modalService.open(ClaseDeleteComponent,{size: 'md', centered: true});
    modalref.componentInstance.CLASE = CLASE;

    modalref.componentInstance.ClaseD.subscribe((EditSection:any) => {
      let INDEX = this.CLASES.findIndex((item:any) => item._id == CLASE._id);
      if(INDEX != -1){
        this.CLASES.splice(INDEX,1);
      }
    })
  }

}
