import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  @Input() USER:any;
  
  @Output() UserE: EventEmitter<any> = new EventEmitter(); 

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
    this.rol = this.USER.rol;
    this.name = this.USER.name;
    this.surname = this.USER.surname;
    this.email = this.USER.email;
    this.profession = this.USER.profession;
    this.description = this.USER.description;
    this.IMAGEN_PREVIZUALIZAR = this.USER.avatar;
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
    if(!this.name || !this.surname || !this.email){
        this.toaster.open({text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',caption: 'VALIDACIÓN',type: 'danger'});
        return;
    }

    let formData = new FormData();

    formData.append("_id",this.USER._id);
    if(this.FILE_AVATAR){
      formData.append("avatar",this.FILE_AVATAR);
    }
    formData.append("name",this.name);
    formData.append("surname",this.surname);
    formData.append("email",this.email);
    if(this.password){
      formData.append("password",this.password);
    }

    formData.append("rol",this.rol);
    if(this.profession){
      formData.append("profession",this.profession);
    }
    if(this.description){
      formData.append("description",this.description);
    }
    
    this.userService.update(formData).subscribe((resp:any) => {
      console.log(resp);
      this.UserE.emit(resp.user);
      this.modal.close();
      this.toaster.open({text: 'SE EDITO EL USUARIO SELECCIONADO',caption: 'VALIDACIÓN',type: 'primary'});
    })

  }

}
