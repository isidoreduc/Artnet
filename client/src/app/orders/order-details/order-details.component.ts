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
  pipe = new DatePipe('en-GB');

  constructor(private orderService: OrdersService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.getOrderById();

  }

  getOrderById = () => this.orderService.getOrderById(Number(this.activatedRoute.snapshot.paramMap.get("id")))
    .subscribe(result => {
      this.order = result;
      const myFormattedDate = this.pipe.transform(this.order.orderDate, 'short');
      this.breadcrumbService.set("@orderDetails", myFormattedDate);

      this.orderTotals = {
        subtotal: result.subtotal,
        shipping: result.deliveryPrice,
        total: result.total
      };
    }, err => console.log(err));
}
