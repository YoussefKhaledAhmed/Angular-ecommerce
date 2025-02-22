import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from './../../../core/services/orders/orders.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShippingAddress } from '../../../shared/interfaces/shippingAddress/address-info';
import { AuthenticationService } from '../../../core/services/auth/authentication.service';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {

  cartId !: string;

  private readonly OrdersService = inject(OrdersService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly auth = inject(AuthenticationService);

  addressForm : FormGroup = new FormGroup({
    details : new FormControl(null , [Validators.required]),
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city : new FormControl(null , [Validators.required])
  });

  @ViewChild('validateDetails') validateDetailsElement !: ElementRef;
  @ViewChild('validatePhone') validatePhoneElement !: ElementRef;
  @ViewChild('validateCity') validateCityElement !: ElementRef;

  isLoading : boolean = false;

  validateInput(whichInput : string){
      /* if there is no errors regarding the angular validation */
      if( this.addressForm.get(whichInput)?.errors ){
        switch(whichInput){
          case 'details':
            this.validateDetailsElement.nativeElement.classList.remove('opacity-0');
            this.validateDetailsElement.nativeElement.classList.remove('h-0');
            this.validateDetailsElement.nativeElement.classList.add('opacity-100');
            this.validateDetailsElement.nativeElement.classList.add('h-12');
            break;
          case 'city':
            this.validateCityElement.nativeElement.classList.remove('opacity-0');
            this.validateCityElement.nativeElement.classList.remove('h-0');
            this.validateCityElement.nativeElement.classList.add('opacity-100');
            this.validateCityElement.nativeElement.classList.add('h-12');
            break;
          case 'phone':
            this.validatePhoneElement.nativeElement.classList.remove('opacity-0');
            this.validatePhoneElement.nativeElement.classList.remove('h-0');
            this.validatePhoneElement.nativeElement.classList.add('opacity-100');
            this.validatePhoneElement.nativeElement.classList.add('h-12');
            break;
        }
      }
      /* if there is error regarding the Angular validation */
      else{
        switch(whichInput){
          case 'details':
            this.validateDetailsElement.nativeElement.classList.add('opacity-0');
            this.validateDetailsElement.nativeElement.classList.add('h-0');
            this.validateDetailsElement.nativeElement.classList.remove('opacity-100');
            this.validateDetailsElement.nativeElement.classList.remove('h-12');
            break;
          case 'city':
            this.validateCityElement.nativeElement.classList.add('opacity-0');
            this.validateCityElement.nativeElement.classList.add('h-0');
            this.validateCityElement.nativeElement.classList.remove('opacity-100');
            this.validateCityElement.nativeElement.classList.remove('h-12');
            break;
          case 'phone':
            this.validatePhoneElement.nativeElement.classList.add('opacity-0');
            this.validatePhoneElement.nativeElement.classList.add('h-0');
            this.validatePhoneElement.nativeElement.classList.remove('opacity-100');
            this.validatePhoneElement.nativeElement.classList.remove('h-12');
            break;
        }
      }
  }


  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((parameters)=>{
      this.cartId = parameters.get('cartId') as string;
    })
    console.log(this.auth.userData.getValue().id);

  }


  SubmitAddress(){
    if(this.addressForm.valid){
      let address = {
        shippingAddress : this.addressForm.value
      }
      this.OrdersService.checkOut(address , this.cartId).subscribe((response)=>{
        if(response.status == 'success'){
          window.location.href = response.session.url;
          console.log(response);
          
        }
        
      });
      
    }
  }
}
