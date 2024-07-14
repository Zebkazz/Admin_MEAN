import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent implements OnInit {

  @Input() USER:any;
  
  @Output() UserD: EventEmitter<any> = new EventEmitter(); 

  constructor(
    public userService: UsersService,
    public toaster: Toaster,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.userService.remove(this.USER._id).subscribe((resp:any) => {
      console.log(resp);
      this.UserD.emit('');
      this.modal.close();
      this.toaster.open({text: 'SE ELIMINO EL USUARIO',caption: 'VALIDACIÓN',type: 'primary'});
    })
  }
}
