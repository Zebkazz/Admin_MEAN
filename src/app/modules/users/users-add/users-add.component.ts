import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../service/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {

  @Output() UserC: EventEmitter<any> = new EventEmitter(); 

  rol:string = 'admin';
  name:string = '';
  surname:string = '';
  email:string = '';
  password:string = '';
  profession:string = '';
  description:string = '';

  FILE_AVATAR:any;
  IMAGEN_PREVIZUALIZAR:any = 'assets/media/avatars/300-6.jpg';
  constructor(
    public userService: UsersService,
    public toaster: Toaster,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  processAvatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open({text: 'SOLAMENTE SE ACEPTAN IMAGENES',caption: 'VALIDACIONES',type: 'danger'});
      return;
    }
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => this.IMAGEN_PREVIZUALIZAR = reader.result;
  }

  save(){
    if(!this.name || !this.surname || !this.FILE_AVATAR || !this.email
      || !this.password){
        this.toaster.open({text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',caption: 'VALIDACIÓN',type: 'danger'});
        return;
    }

    let formData = new FormData();

    formData.append("avatar",this.FILE_AVATAR);
    formData.append("name",this.name);
    formData.append("surname",this.surname);
    formData.append("email",this.email);
    formData.append("password",this.password);

    formData.append("rol",this.rol);
    formData.append("profession",this.profession);
    formData.append("description",this.description);
    
    this.userService.register(formData).subscribe((resp:any) => {
      console.log(resp);
      this.UserC.emit(resp.user);
      this.modal.close();
      this.toaster.open({text: 'SE REGISTRO UN NUEVO USUARIO',caption: 'VALIDACIÓN',type: 'primary'});
    })

  }
}
