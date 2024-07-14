import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategorieService } from '../service/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrls: ['./categorie-add.component.scss']
})
export class CategorieAddComponent implements OnInit {

  @Output() CategorieC: EventEmitter<any> = new EventEmitter(); 

  title:string = '';

  FILE_IMAGEN:any;
  IMAGEN_PREVIZUALIZAR:any = 'assets/media/avatars/300-6.jpg';
  constructor(
    public categorieService: CategorieService,
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
    this.FILE_IMAGEN = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_IMAGEN);
    reader.onloadend = () => this.IMAGEN_PREVIZUALIZAR = reader.result;
  }

  save(){
    if(!this.FILE_IMAGEN || !this.title){
        this.toaster.open({text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',caption: 'VALIDACIÓN',type: 'danger'});
        return;
    }

    let formData = new FormData();

    formData.append("imagen",this.FILE_IMAGEN);
    formData.append("title",this.title);
    
    this.categorieService.registerCategorie(formData).subscribe((resp:any) => {
      console.log(resp);
      this.CategorieC.emit(resp.categorie);
      this.modal.close();
      this.toaster.open({text: 'SE REGISTRO UNA NUEVA CATEGORIA',caption: 'VALIDACIÓN',type: 'primary'});
    })

  }

}
