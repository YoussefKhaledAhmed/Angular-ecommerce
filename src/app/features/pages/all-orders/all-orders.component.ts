import { Component, inject } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { OrderComponent } from "../../../shared/components/order/order.component";
import { OrderInfoType } from '../../../shared/interfaces/orderInfo/order-info';

@Component({
  selector: 'app-all-orders',
  imports: [OrderComponent],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent {

  private readonly orderService = inject(OrdersService);
  userOrders !: OrderInfoType[];
  
  getUserOrders(){
    this.orderService.getUserOrders().subscribe((response)=>{
      this.userOrders = response;
    });
  }

  ngOnInit(){
    this.getUserOrders();
  }

}
