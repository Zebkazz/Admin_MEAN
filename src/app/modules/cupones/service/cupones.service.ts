import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class CuponesService {

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
    let URL = URL_SERVICIOS+"/cupone/config_all";
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  showCupone(cupon_id:string = ''){
    let headers = new HttpHeaders({'token': this.authservice.token});
    this.isLoadingSubject.next(true);
    let URL = URL_SERVICIOS+"/cupone/show/"+cupon_id;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  listCupones(search:any = null,state:any = null){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authservice.token});
    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;
    }
    let URL = URL_SERVICIOS+"/cupone/list"+LINK;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  registerCupon(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/cupone/register";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  updateCupon(data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/cupone/update";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  removeCupon(categorie_id:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({"token": this.authservice.token});
    let URL = URL_SERVICIOS+"/cupone/remove/"+categorie_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

}
