import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from 'src/app/shared/model/order';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  @Input() deliveryMethods: IDeliveryMethod[];
  @Output() deliveryCostEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  updateDeliveryCost = (event: IDeliveryMethod) =>
    this.deliveryCostEvent.emit(event);


}
