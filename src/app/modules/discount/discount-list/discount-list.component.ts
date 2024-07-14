import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  state:any = 1;
  DISCOUNTS:any = [];
  isLoading:any;

  CATEGORIES:any = [];
  categorie:string = '';
  constructor(
    public discountService: DiscountService,
    public modalService: NgbModal,
    public datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.listDiscounts();
  }

  listDiscounts(){
    this.discountService.listDiscounts().subscribe((resp:any) => {
      console.log(resp);
      this.DISCOUNTS = resp.discounts;
    })
  }
  getTypeCampaign(type_campaign:number){
    let response = '';
    switch (type_campaign) {
      case 1:
        response = 'CAMPAÑA NORMAL'
        break;
      case 2:
        response = 'CAMPAÑA FLASH'
        break;
      case 3:
        response = 'CAMPAÑA BANNER'
        break;
    
      default:
        break;
    }
    return response;
  }

  getParseDate(date:any){
    return this.datePipe.transform(date,"yyyy-MM-dd",'UTC');
  }
  deleteDiscount(DISCOUNT:any){
    const modalRef = this.modalService.open(DiscountDeleteComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.DISCOUNT = DISCOUNT;
    modalRef.componentInstance.DISCOUNTD.subscribe((val:any) => {
      let INDEX = this.DISCOUNTS.findIndex((item:any) => item._id == DISCOUNT._id);
      if(INDEX != -1){
        this.DISCOUNTS.splice(INDEX,1);
      }
    })
  }
}
