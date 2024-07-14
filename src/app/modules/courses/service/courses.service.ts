import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ConfigAll(){
    let headers = new HttpHeaders({'token': this.authservice.token});
    this.isLoadingSubject.next(true);
    let URL = URL_SERVICIOS+"/courses/config_all";
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  showCourse(course_id:string = ''){
    let headers = new HttpHeaders({'token': this.authservice.token});
    this.isLoadingSubject.next(true);
    let URL = URL_SERVICIOS+"/courses/show/"+course_id;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  listCourses(search:any = null,state:any = null,categorie:any = null){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authservice.token});
    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;
    }
    if(categorie){
      LINK += "&categorie="+categorie;
    }
    let URL = URL_SERVICIOS+"/courses/list"+LINK;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  registerCourses(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/courses/register";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  uploadVimeo(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/courses/upload_vimeo";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  updateCourses(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/courses/update";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  removeCourses(categorie_id:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/courses/remove/"+categorie_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

}
