import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private readonly httpClient = inject(HttpClient);

  getAllBrands(): Observable<any>
  {
    return this.httpClient.get(`${Env.baseURL}/api/v1/brands`);
  }
}
