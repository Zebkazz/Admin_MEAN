import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponesRoutingModule } from './cupones-routing.module';
import { CuponesComponent } from './cupones.component';
import { CuponeAddComponent } from './cupone-add/cupone-add.component';
import { CuponeEditComponent } from './cupone-edit/cupone-edit.component';
import { CuponeListComponent } from './cupone-list/cupone-list.component';
import { CuponeDeleteComponent } from './cupone-delete/cupone-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    CuponesComponent,
    CuponeAddComponent,
    CuponeEditComponent,
    CuponeListComponent,
    CuponeDeleteComponent
  ],
  imports: [
    CommonModule,
    CuponesRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class CuponesModule { }
