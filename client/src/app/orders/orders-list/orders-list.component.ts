import { Component, OnInit } from '@angular/core';
import { IServerOrder } from 'src/app/shared/model/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: IServerOrder[];
  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders = () => this.orderService.getOrders()
    .subscribe(result => this.orders = result, err => console.log(err));

}
