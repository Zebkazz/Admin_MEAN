import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../service/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-categorie-delete',
  templateUrl: './categorie-delete.component.html',
  styleUrls: ['./categorie-delete.component.scss']
})
export class CategorieDeleteComponent implements OnInit {

  @Input() CATEGORIE:any;
  
  @Output() CategorieD: EventEmitter<any> = new EventEmitter(); 

  constructor(
    public categorieService: CategorieService,
    public toaster: Toaster,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.categorieService.removeCategorie(this.CATEGORIE._id).subscribe((resp:any) => {
      console.log(resp);
      this.CategorieD.emit('');
      this.modal.close();
      this.toaster.open({text: 'SE ELIMINO LA CATEGORIA',caption: 'VALIDACIÓN',type: 'primary'});
    })
  }

}
