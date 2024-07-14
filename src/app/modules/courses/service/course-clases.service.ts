import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class CourseClasesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listClases(section_id:any = null){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/list"+(section_id ? "?section_id="+section_id : '');
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  registerClase(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/register";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  uploadVimeo(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/upload_vimeo";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  uploadFile(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/register_file";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  updateClase(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/update";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  removeClase(section_id:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/remove/"+section_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  removeClaseFile(file_id:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/delete_file/"+file_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

}
