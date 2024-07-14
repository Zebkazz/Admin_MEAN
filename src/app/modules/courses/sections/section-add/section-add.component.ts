import { Component, OnInit } from '@angular/core';
import { CourseSectionService } from '../../service/course-section.service';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionDeleteComponent } from '../section-delete/section-delete.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {

  isLoading$:any;

  title:any = '';
  course_id:any = '';

  SECTIONS:any = [];
  constructor(
    public courseSectionService: CourseSectionService,
    public activedRouter: ActivatedRoute,
    public toaster: Toaster,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ =  this.courseSectionService.isLoading$;
    this.activedRouter.params.subscribe((resp:any) => {
      this.course_id = resp.id;
    })

    this.courseSectionService.listSections(this.course_id).subscribe((resp:any) => {
      console.log(resp);
      this.SECTIONS = resp.sections;
    })
  }

  save(){
    if(!this.title){
      this.toaster.open({text: 'EL TITULO ES NECESARIO PARA REGISTRAR UNA SECCIÓN',caption: 'VALIDACIÓN',type: 'danger'});
      return;
    }
    let data = {
      course: this.course_id,
      title: this.title,
    }
    this.courseSectionService.registerSection(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text,caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.title = '';
        this.SECTIONS.unshift(resp.section);
        this.toaster.open({text: "LA SECCION SE HA REGISTRADO CORRECTAMENTE",caption: 'VALIDACIÓN',type: 'primary'});
      }
    })
  }

  editSection(SECTION:any){
    const modalref = this.modalService.open(SectionEditComponent,{size: 'md', centered: true});
    modalref.componentInstance.SECTION = SECTION;

    modalref.componentInstance.SectionE.subscribe((EditSection:any) => {
      let INDEX = this.SECTIONS.findIndex((item:any) => item._id == EditSection._id);
      if(INDEX != -1){
        this.SECTIONS[INDEX] = EditSection;
      }
    })
  }

  deleteSection(SECTION:any){
    const modalref = this.modalService.open(SectionDeleteComponent,{size: 'md', centered: true});
    modalref.componentInstance.SECTION = SECTION;

    modalref.componentInstance.SectionD.subscribe((EditSection:any) => {
      let INDEX = this.SECTIONS.findIndex((item:any) => item._id == SECTION._id);
      if(INDEX != -1){
        this.SECTIONS.splice(INDEX,1);
      }
    })
  }
}
