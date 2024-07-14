import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountComponent,
    children: [
      {
        path: 'registro',
        component: DiscountAddComponent,
      },
      {
        path: 'lista/editar/:id',
        component: DiscountEditComponent,
      },
      {
        path: 'lista',
        component: DiscountListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
