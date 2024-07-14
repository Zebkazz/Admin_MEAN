import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CoursesComponent } from './courses.component';
import { SectionAddComponent } from './sections/section-add/section-add.component';
import { ClaseAddComponent } from './sections/clases/clase-add/clase-add.component';

const routes: Routes = [{
  path: '',
  component: CoursesComponent,
  children: [
    {
      path:'registro',
      component: CourseAddComponent,
    },
    {
      path: 'lista/edicion/:id',
      component: CourseEditComponent,
    },
    {
      path: 'lista/seccion/:id',
      component: SectionAddComponent,
    },
    {
      path: 'lista/seccion/clases/:id',
      component: ClaseAddComponent,
    },
    {
      path: 'lista',
      component: CourseListComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
