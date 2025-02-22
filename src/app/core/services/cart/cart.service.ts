import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly httpClient = inject(HttpClient);


  addToCart(productId : string):Observable<any>{
    return this.httpClient.post(`${Env.baseURL}/api/v1/cart`,
      {
        "productId": productId
      }
    );
  }
  updateCart(productId : string , count: string):Observable<any>{
    return this.httpClient.put(`${Env.baseURL}/api/v1/cart/${productId}`,
      {
        "count": count
      }
    );
  }
  getUserCart():Observable<any>{
    return this.httpClient.get(`${Env.baseURL}/api/v1/cart`);
  }
  removeItemFromCart(productId : string):Observable<any>{
    return this.httpClient.delete(`${Env.baseURL}/api/v1/cart/${productId}`);
  }
  deleteCart():Observable<any>{
    return this.httpClient.delete(`${Env.baseURL}/api/v1/cart`);
  }

}
