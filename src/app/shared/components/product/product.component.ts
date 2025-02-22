import { Component, inject, Input } from '@angular/core';
import { ProductInfoType } from '../../interfaces/productInfo/product-info';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product !: ProductInfoType;
  private readonly cartService = inject(CartService);
  private toastrService = inject(ToastrService);


  addToCart(productId: string){
    this.cartService.addToCart(productId).subscribe((response)=>{
      this.toastrService.success('thanks for your time' , 'product added successfully');
    });
  }
}
