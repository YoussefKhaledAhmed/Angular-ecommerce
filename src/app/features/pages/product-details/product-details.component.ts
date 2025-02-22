import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductInfoType } from '../../../shared/interfaces/productInfo/product-info';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private toastrService = inject(ToastrService);
  productId !: string|null;
  productDetails !: ProductInfoType;

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((paramters)=>{
      this.productId = paramters.get('productId');
    });

    if(this.productId){
      this.productsService.GetSpecificProducts(this.productId).subscribe((response)=>{
        this.productDetails = response.data;
        console.log(this.productDetails);
        
      });
    }
  }

  addToCart(productId: string){
    this.cartService.addToCart(productId).subscribe((response)=>{
      this.toastrService.success('thanks for your time' , 'product added successfully');
    });
  }
}
