import { Pipe, PipeTransform } from '@angular/core';
import { ProductInfoType } from '../../interfaces/productInfo/product-info';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts : ProductInfoType[], searchWord : string): ProductInfoType[] {
    return allProducts.filter( element => element.title.toLowerCase().includes(searchWord.toLowerCase()));
  }

}
