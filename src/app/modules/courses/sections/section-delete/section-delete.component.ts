import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseSectionService } from '../../service/course-section.service';

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent implements OnInit {

  @Input() SECTION:any;
  
  @Output() SectionD: EventEmitter<any> = new EventEmitter(); 

  constructor(
    public modal: NgbActiveModal,
    public courseSectionService: CourseSectionService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.courseSectionService.removeSection(this.SECTION._id).subscribe((resp:any) => {
      console.log(resp);
      this.SectionD.emit('');
      this.modal.close();
      this.toaster.open({text: 'SE ELIMINO LA SECCIÓN',caption: 'VALIDACIÓN',type: 'primary'});
    })
  }

}
