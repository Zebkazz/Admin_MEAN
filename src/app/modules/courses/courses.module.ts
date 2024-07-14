import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { SectionAddComponent } from './sections/section-add/section-add.component';
import { SectionEditComponent } from './sections/section-edit/section-edit.component';
import { SectionDeleteComponent } from './sections/section-delete/section-delete.component';
import { ClaseAddComponent } from './sections/clases/clase-add/clase-add.component';
import { ClaseEditComponent } from './sections/clases/clase-edit/clase-edit.component';
import { ClaseDeleteComponent } from './sections/clases/clase-delete/clase-delete.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseListComponent,
    CourseDeleteComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionDeleteComponent,
    ClaseAddComponent,
    ClaseEditComponent,
    ClaseDeleteComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,

    CKEditorModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class CoursesModule { }
