import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly httpClient = inject(HttpClient);


  GetAllProducts(pageNum : string):Observable<any>
  {
    return this.httpClient.get(`${Env.baseURL}/api/v1/products?page=${pageNum}`);
  }
  GetSpecificProducts(productId: string):Observable<any>
  {
    return this.httpClient.get(`${Env.baseURL}/api/v1/products/${productId}`);
  }
}
