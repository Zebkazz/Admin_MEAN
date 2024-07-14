import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.scss']
})
export class CourseDeleteComponent implements OnInit {

  @Input() COURSE:any;
  
  @Output() COURSED: EventEmitter<any> = new EventEmitter(); 

  constructor(
    public courseService: CoursesService,
    public toaster: Toaster,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.courseService.removeCourses(this.COURSE._id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.code == 403){
        this.toaster.open({text: 'NO SE PUDO ELIMINAR EL CURSO',caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.COURSED.emit('');
        this.modal.close();
        this.toaster.open({text: 'SE ELIMINO EL CURSO',caption: 'VALIDACIÓN',type: 'primary'});
      }
    })
  }

}
