import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { IServerOrder } from 'src/app/shared/model/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IServerOrder;
  basket$ = new ReplaySubject<IServerOrder>();
  constructor(private orderService: OrdersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById = () => this.orderService.getOrderById(Number(this.activatedRoute.snapshot.paramMap.get("id")))
    .subscribe(result =>{
      this.order = result;
      this.basket$.next(result);
    }, err => console.log(err));
}
