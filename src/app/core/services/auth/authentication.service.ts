import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginInfoType, RegisterInfoType, userDataType } from '../../../shared/interfaces/registerInfo/authentication-info';
import { Env } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }

  private readonly httpClient = inject(HttpClient);
  public userData : BehaviorSubject<any> = new BehaviorSubject(null);
  

  sendRegisterInfo(data: RegisterInfoType):Observable<any>{
    return this.httpClient.post(`${Env.baseURL}/api/v1/auth/signup`, data);
  }

  sendLoginInfo(data: LoginInfoType):Observable<any>{
    return this.httpClient.post(`${Env.baseURL}/api/v1/auth/signin`, data);
  }

  saveUserInfo(){
    if(localStorage.getItem('userToken')){
      this.userData.next( jwtDecode(localStorage.getItem('userToken') as string) );
    }
  }

  clearUserInfo(){
    this.userData.next(null);
  }
}
