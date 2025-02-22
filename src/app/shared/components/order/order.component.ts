import { Component, Input, OnChanges } from '@angular/core';
import { OrderInfoType } from '../../interfaces/orderInfo/order-info';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [DatePipe , RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @Input() order !: OrderInfoType;

  toggle : boolean = false;

  toggleModal(){
    this.toggle = true;
  }

  closeModal(event : Event){
    if((event.target as HTMLElement).id == 'parent'){
      this.toggle = false;
    }
  }

  ngOnInit(){
    console.log(this.order);
    
  }

}
