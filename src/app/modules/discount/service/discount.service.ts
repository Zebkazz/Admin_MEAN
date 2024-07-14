import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

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
    let URL = URL_SERVICIOS+"/discount/config_all";
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  showDiscount(cupon_id:string = ''){
    let headers = new HttpHeaders({'token': this.authservice.token});
    this.isLoadingSubject.next(true);
    let URL = URL_SERVICIOS+"/discount/show/"+cupon_id;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  listDiscounts(){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/discount/list";
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  registerDiscount(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/discount/register";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  updateDiscount(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/discount/update";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  removeDiscount(categorie_id:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/discount/remove/"+categorie_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }
  
}
