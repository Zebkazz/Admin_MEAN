import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseDeleteComponent } from '../course-delete/course-delete.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  search:string = '';
  state:string = '';
  isLoading:any;
  COURSES:any = [];

  CATEGORIES:any = [];
  categorie:string = '';
  constructor(
    public courseService: CoursesService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.listCourse();
    this.courseService.ConfigAll().subscribe((resp:any) => {
      console.log(resp);
      this.CATEGORIES = resp.categories;
    })
  }

  listCourse(){
    this.courseService.listCourses(this.search,this.state,this.categorie).subscribe((resp:any) => {
      console.log(resp);
      this.COURSES = resp.courses;
    })
  }

  deleteCourse(COURSE:any){
    const modalRef = this.modalService.open(CourseDeleteComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.COURSE = COURSE;
    modalRef.componentInstance.COURSED.subscribe((val:any) => {
      let INDEX = this.COURSES.findIndex((item:any) => item._id == COURSE._id);
      if(INDEX != -1){
        this.COURSES.splice(INDEX,1);
      }
    })
  }
}
