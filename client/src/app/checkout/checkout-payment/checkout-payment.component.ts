import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Output() createorderClickEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  createOrder = (event: any) =>
    this.createorderClickEvent.emit(event);
}
