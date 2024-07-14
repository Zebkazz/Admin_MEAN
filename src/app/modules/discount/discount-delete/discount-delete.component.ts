import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-discount-delete',
  templateUrl: './discount-delete.component.html',
  styleUrls: ['./discount-delete.component.scss']
})
export class DiscountDeleteComponent implements OnInit {

  @Input() DISCOUNT:any;
  
  @Output() DISCOUNTD: EventEmitter<any> = new EventEmitter(); 

  constructor(
    public discountService: DiscountService,
    public toaster: Toaster,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.discountService.removeDiscount(this.DISCOUNT._id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.code == 403){
        this.toaster.open({text: 'NO SE PUDO ELIMINAR EL DESCUENTO',caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.DISCOUNTD.emit('');
        this.modal.close();
        this.toaster.open({text: 'SE ELIMINO EL DESCUENTO',caption: 'VALIDACIÓN',type: 'primary'});
      }
    })
  }

}
