import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CuponesService } from '../service/cupones.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-cupone-delete',
  templateUrl: './cupone-delete.component.html',
  styleUrls: ['./cupone-delete.component.scss']
})
export class CuponeDeleteComponent implements OnInit {

  @Input() CUPON:any;
  
  @Output() CUPOND: EventEmitter<any> = new EventEmitter(); 

  constructor(
    public cuponService: CuponesService,
    public toaster: Toaster,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.cuponService.removeCupon(this.CUPON._id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.code == 403){
        this.toaster.open({text: 'NO SE PUDO ELIMINAR EL CUPON',caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.CUPOND.emit('');
        this.modal.close();
        this.toaster.open({text: 'SE ELIMINO EL CUPON',caption: 'VALIDACIÓN',type: 'primary'});
      }
    })
  }


}
