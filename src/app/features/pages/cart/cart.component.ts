import { stringify } from 'querystring';
import { CartInfoType } from '../../../shared/interfaces/cartInfo/cart-info';
import { CartService } from './../../../core/services/cart/cart.service';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private toastrService = inject(ToastrService);

  
  cartProducts !: CartInfoType;

  ngOnInit(){
    this.getUserCart();
  }

  getUserCart(){
    this.cartService.getUserCart().subscribe((response)=>{
      this.cartProducts = response.data;
    });
  }

  removeProduct(productId : string){
    this.cartService.removeItemFromCart(productId).subscribe(()=>{
      this.toastrService.success('thanks for your time' , 'product removed successfully');
      this.getUserCart();
    });
  }

  updateProductCount(productId: string , productCount : number|string){
    productCount = productCount.toString();
    this.cartService.updateCart(productId , productCount).subscribe((res)=>{
      this.getUserCart();
      this.toastrService.success('thanks for your time' , 'product updated successfully');
    });
  }

  clearCart(){
    this.cartService.deleteCart().subscribe(()=>{
      this.toastrService.success('thanks for your time' , 'Cart deleted');
      this.getUserCart();
    });
  }
  
}
