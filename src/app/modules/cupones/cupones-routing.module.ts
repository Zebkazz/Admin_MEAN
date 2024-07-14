import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuponesComponent } from './cupones.component';
import { CuponeAddComponent } from './cupone-add/cupone-add.component';
import { CuponeEditComponent } from './cupone-edit/cupone-edit.component';
import { CuponeListComponent } from './cupone-list/cupone-list.component';

const routes: Routes = [
  {
    path: '',
    component: CuponesComponent,
    children: [
      {
        path: 'registro',
        component: CuponeAddComponent,
      },
      {
        path: 'lista/edicion/:id',
        component: CuponeEditComponent,
      },
      {
        path: 'lista',
        component: CuponeListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponesRoutingModule { }
