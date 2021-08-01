import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IServerOrder } from 'src/app/shared/model/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IServerOrder;
  orderTotals: {};
  date: string;
  orderNumber: number;

  constructor(private orderService: OrdersService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.orderNumber = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.getOrderById();

  }

  getOrderById = () => this.orderService.getOrderById(this.orderNumber)
    .subscribe(result => {
      this.order = result;
      this.date = new DatePipe('en-GB').transform(this.order.orderDate, 'short');
      this.breadcrumbService.set("@orderDetails", `Order no. ${this.orderNumber}`);

      this.orderTotals = {
        subtotal: result.subtotal,
        shipping: result.deliveryPrice,
        total: result.total
      };
    }, err => console.log(err));
}
