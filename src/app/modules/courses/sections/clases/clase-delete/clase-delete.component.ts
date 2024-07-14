import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseClasesService } from '../../../service/course-clases.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-clase-delete',
  templateUrl: './clase-delete.component.html',
  styleUrls: ['./clase-delete.component.scss']
})
export class ClaseDeleteComponent implements OnInit {

  @Input() CLASE:any;
  
  @Output() ClaseD: EventEmitter<any> = new EventEmitter(); 

  constructor(
    public modal: NgbActiveModal,
    public courseClaseService: CourseClasesService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.courseClaseService.removeClase(this.CLASE._id).subscribe((resp:any) => {
      console.log(resp);
      this.ClaseD.emit('');
      this.modal.close();
      this.toaster.open({text: 'SE ELIMINO LA CLASE',caption: 'VALIDACIÓN',type: 'primary'});
    })
  }

}
