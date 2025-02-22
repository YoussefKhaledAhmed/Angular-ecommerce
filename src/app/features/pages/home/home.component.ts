import { Component, inject, OnChanges } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductInfoType } from '../../../shared/interfaces/productInfo/product-info';
import { ProductComponent } from "../../../shared/components/product/product.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { BrandInfoType } from '../../../shared/interfaces/brandInfo/brand-info';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  imports: [ProductComponent , CarouselModule , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true,
    autoplay : true,
    autoplayTimeout : 1000,
    autoplaySpeed : 800,
    autoplayHoverPause: true
  }
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoHeight: false,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true,
    animateIn:true,
    autoplay: false
  }

  imgSources: string[] = [
    '/images/slider-image-1.jpeg',
    '/images/slider-image-2.jpeg',
    '/images/slider-image-3.jpeg'
  ]

  private readonly productsService = inject(ProductsService);
  private readonly brandsService = inject(BrandsService);
  public products !: ProductInfoType[];
  public brands !: BrandInfoType[];
  public numberOfPages !: number;
  public page : number = 1;
  searchVal : string ="";

  ngOnInit(){
    console.log('hiiiii');
    this.getProducts(this.page);
    this.getBrands();
  }

  getProducts(pageNum : number | string){
    pageNum = pageNum.toString();
    this.productsService.GetAllProducts(pageNum).subscribe((response)=>{
      this.products = response.data;
      this.numberOfPages = response.metadata.numberOfPages;
      
    });
  }

  getBrands(){
    this.brandsService.getAllBrands().subscribe((response)=>{
      console.log(response);
      this.brands = response.data;
    });
  }
  increment(){
    if(this.page == 1){
      this.page++;
      this.getProducts(this.page);
    }
  }
  decrement(){
    if(this.page == 2){
      this.page--;
      this.getProducts(this.page);
    }
  }
}
