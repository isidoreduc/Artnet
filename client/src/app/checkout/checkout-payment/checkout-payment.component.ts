import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  stripePublishableKey = environment.stripePublicKey;
  @Output() createorderClickEvent = new EventEmitter();
  @Input() checkoutForm: FormGroup;
  @ViewChild("cardNumber", { static: true }) cardNumberElement: ElementRef;
  @ViewChild("cardExpiry", { static: true }) cardExpiryElement: ElementRef;
  @ViewChild("cardCvc", { static: true }) cardCvcElement: ElementRef;
  cardErrors: any;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit = () => {
    this.stripe = Stripe(this.stripePublishableKey);
    const elements = this.stripe.elements();
    this.cardNumber = elements.create("cardNumber");
    this.cardNumber.mount(this.cardNumberElement.nativeElement);

    this.cardExpiry = elements.create("cardExpiry");
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardCvc = elements.create("cardCvc");
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
  };

  ngOnDestroy = () => {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  createOrder = (event: any) =>
    this.createorderClickEvent.emit(event);
}
