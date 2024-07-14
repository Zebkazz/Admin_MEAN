import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CuponesService } from '../service/cupones.service';
import { CuponeDeleteComponent } from '../cupone-delete/cupone-delete.component';

@Component({
  selector: 'app-cupone-list',
  templateUrl: './cupone-list.component.html',
  styleUrls: ['./cupone-list.component.scss']
})
export class CuponeListComponent implements OnInit {

  search:string = '';
  state:string = '';
  isLoading:any;
  CUPONES:any = [];

  CATEGORIES:any = [];
  categorie:string = '';
  constructor(
    public cuponeService: CuponesService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.cuponeService.isLoading$;
    this.listCupone();
  }

  listCupone(){
    this.cuponeService.listCupones(this.search,this.state).subscribe((resp:any) => {
      console.log(resp);
      this.CUPONES = resp.cupones;
    })
  }

  deleteCupon(CUPON:any){
    const modalRef = this.modalService.open(CuponeDeleteComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.CUPON = CUPON;
    modalRef.componentInstance.CUPOND.subscribe((val:any) => {
      let INDEX = this.CUPONES.findIndex((item:any) => item._id == CUPON._id);
      if(INDEX != -1){
        this.CUPONES.splice(INDEX,1);
      }
    })
  }

}
