import { AuthenticationService } from './../auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShippingAddress } from '../../../shared/interfaces/shippingAddress/address-info';
import { Observable } from 'rxjs';
import { Env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly httpClient = inject(HttpClient);
  private readonly authenticationService = inject(AuthenticationService);


  checkOut(address : Object , cartId : string) : Observable<any>
  { 
    return this.httpClient.post(`${Env.baseURL}/api/v1/orders/checkout-session/${cartId}?url=${Env.successURL}` , address);
  }

  getUserOrders():Observable<any>
  {
    return this.httpClient.get(`${Env.baseURL}/api/v1/orders/user/${this.authenticationService.userData.getValue().id}`);
  }
}
