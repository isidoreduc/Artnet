import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/model/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];
  @Output() deliveryCostEvent = new EventEmitter();

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getDeliveryMethods();
  }

  getDeliveryMethods = () => this.checkoutService.getDeliveryMethods().subscribe(result =>
    this.deliveryMethods = result, err => console.log(err) );


  updateDeliveryCost = (deliveryMethod: IDeliveryMethod) =>
    this.basketService.setShippingCost(deliveryMethod);


}
