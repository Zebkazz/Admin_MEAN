import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CuponesService } from '../service/cupones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cupone-edit',
  templateUrl: './cupone-edit.component.html',
  styleUrls: ['./cupone-edit.component.scss']
})
export class CuponeEditComponent implements OnInit {

  code:any = null;
  type_discount:number = 1;
  type_count:number = 1;
  type_cupon:number = 1;
  num_use:number = 0;
  discount:number = 0;
  COURSES:any = [];
  COURSES_SELECTED:any = [];
  CATEGORIES:any = [];
  CATEGORIES_SELECTED:any = [];

  course_id:any = null;
  categorie_id:any = null;

  isLoading$:any;

  CUPON_SELECTED:any = null;
  CUPON_ID:any;
  constructor(
    public cuponeService: CuponesService,
    public toaster: Toaster,
    public activedRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isLoading$  = this.cuponeService.isLoading$;
    this.activedRouter.params.subscribe((resp:any) => {
      console.log(resp);
      this.CUPON_ID = resp.id;
    })
    this.cuponeService.ConfigAll().subscribe((resp:any) => {
      console.log(resp);
      this.COURSES = resp.courses;
      this.CATEGORIES = resp.categories;

      this.cuponeService.showCupone(this.CUPON_ID).subscribe((resp:any) => {
        console.log(resp);
        this.CUPON_SELECTED = resp.cupon;
        this.code = this.CUPON_SELECTED.code ;
        this.type_discount = this.CUPON_SELECTED.type_discount ;
        this.discount = this.CUPON_SELECTED.discount ;
        this.type_count = this.CUPON_SELECTED.type_count ;
        this.num_use = this.CUPON_SELECTED.num_use ;
        this.type_cupon = this.CUPON_SELECTED.type_cupon;
  
        if(this.type_cupon == 1){//CURSOS
          this.CUPON_SELECTED.courses.forEach((element:any) => {
            let COURSE_S = this.COURSES_SELECTED.find((item:any) => item._id == element._id);
            if(!COURSE_S){
              let COURSE_T = this.COURSES.find((item:any) => item._id == element._id);
              console.log(COURSE_T);
              this.COURSES_SELECTED.push(COURSE_T);
            }
          });
        }else{//CATEGORIAS
          this.CUPON_SELECTED.categories.forEach((element:any) => {
            let CATEGORIE_S = this.CATEGORIES_SELECTED.find((item:any) => item._id == element._id);
            if(!CATEGORIE_S){
              let CAETGORIE_T = this.CATEGORIES.find((item:any) => item._id == element._id);
              this.CATEGORIES_SELECTED.push(CAETGORIE_T);
            }
          });
        }
  
      })
      
    })

  }

  save(){

    if(!this.code || !this.discount){
      this.toaster.open({text: 'NECESITAS LLENAR TODOS LOS CAMPOS NECESARIOS',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    if(this.type_count == 2 && this.num_use == 0){
      this.toaster.open({text: 'NECESITAS LLENAR UN NUMERO DE USOS LIMITE',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    if(this.type_cupon == 1 &&  this.COURSES_SELECTED.length == 0){
      this.toaster.open({text: 'NECESITAS SELECCIONAR CURSOS',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    if(this.type_cupon == 2 &&  this.CATEGORIES_SELECTED.length == 0){
      this.toaster.open({text: 'NECESITAS SELECCIONAR CATEGORIAS',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }

    let courses_selected_r:any = [];
    let categories_selected_r:any = [];

    this.COURSES_SELECTED.forEach((element:any) => {
      courses_selected_r.push({
        _id: element._id,
      })
    });

    this.CATEGORIES_SELECTED.forEach((element:any) => {
      categories_selected_r.push({
        _id: element._id,
      })
    });
    let data = {
      code: this.code,
      type_discount: this.type_discount,
      discount: this.discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_cupon: this.type_cupon,
      courses: courses_selected_r,
      categories: categories_selected_r,
      _id: this.CUPON_ID,
    }

    this.cuponeService.updateCupon(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text,caption: 'VALIDACIÓN',type: 'warning'});
      }else{
        this.toaster.open({text: resp.message_text,caption: 'VALIDACIÓN',type: 'primary'});
      }
    })

  }

  selectedTypeDiscount(val:number){
    this.type_discount  = val;
  }

  selectedTypeCount(val:number){
    this.type_count  = val;
  }

  selectedTypeCupon(val:number){
    this.type_cupon  = val;
    this.COURSES_SELECTED = [];
    this.CATEGORIES_SELECTED = [];
    this.course_id = '';
    this.categorie_id = '';
  }

  addCourse(){
    if(this.course_id){

      let COURSE_INDEX = this.COURSES.findIndex((item:any) => item._id == this.course_id);

      if(COURSE_INDEX != -1){
        let VALID_EXIT_COURSE = this.COURSES_SELECTED.find((item:any) => item._id == this.course_id);
        if(VALID_EXIT_COURSE){
          this.toaster.open({text: 'NECESITAS SELECCIONAR OTRO CURSO PORQUE YA ESTA EN LA LISTA',caption: 'VALIDACIÓN',type: 'warning'});
          return;
        }else{
          this.COURSES_SELECTED.push(this.COURSES[COURSE_INDEX]);
          this.course_id = '';
        }
      }

    }else{
      this.toaster.open({text: 'NECESITAS SELECCIONAR UN CURSO PARA PODER AGREGARLO',caption: 'VALIDACIÓN',type: 'warning'});
    }
  }
  addCategorie(){

    if(this.categorie_id){

      let CATEGORIE_INDEX = this.CATEGORIES.findIndex((item:any) => item._id == this.categorie_id);

      if(CATEGORIE_INDEX != -1){
        let VALID_EXIT_CATEGORIE = this.CATEGORIES_SELECTED.find((item:any) => item._id == this.categorie_id);
        if(VALID_EXIT_CATEGORIE){
          this.toaster.open({text: 'NECESITAS SELECCIONAR OTRA CATEGORIA PORQUE YA ESTA EN LA LISTA',caption: 'VALIDACIÓN',type: 'warning'});
          return;
        }else{
          this.CATEGORIES_SELECTED.push(this.CATEGORIES[CATEGORIE_INDEX]);
          this.categorie_id = '';
        }
      }

    }else{
      this.toaster.open({text: 'NECESITAS SELECCIONAR UNA CATEGORIA PARA PODER AGREGARLO',caption: 'VALIDACIÓN',type: 'warning'});
    }

  }

  deleteCourse(COURSES_SELEC:any){
    let COURSE_INDEX = this.COURSES_SELECTED.findIndex((item:any) => item._id == COURSES_SELEC._id);
    if(COURSE_INDEX != -1){
      this.COURSES_SELECTED.splice(COURSE_INDEX);
    }
  }
  deleteCategorie(CATEGORIES_SELEC:any){
    let COURSE_INDEX = this.CATEGORIES_SELECTED.findIndex((item:any) => item._id == CATEGORIES_SELEC._id);
    if(COURSE_INDEX != -1){
      this.CATEGORIES_SELECTED.splice(COURSE_INDEX);
    }
  }

}
