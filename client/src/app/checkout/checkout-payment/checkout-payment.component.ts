import { OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/model/basket';
import { environment } from 'src/environments/environment';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  stripePublishableKey = environment.stripePublicKey;
  stripeSecretKey = environment.stripeSecretKey;
  @Output() createorderClickEvent = new EventEmitter();
  @Input() checkoutForm: FormGroup;
  @ViewChild("cardNumber") cardNumberElement: ElementRef;
  @ViewChild("cardExpiry", { static: true }) cardExpiryElement: ElementRef;
  @ViewChild("cardCvc", { static: true }) cardCvcElement: ElementRef;
  cardErrors: any;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardHandler = this.onChange.bind(this);
  basket: IBasket;
  paymentSucceded: boolean;

  constructor(private toastr: ToastrService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket = this.basketService.getCurrentBasketValue();
  }


  ngAfterViewInit() {
    this.stripe = Stripe(this.stripePublishableKey);
    const elements = this.stripe.elements();

    this.cardNumber = elements.create("cardNumber");
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener("change", this.cardHandler);

    this.cardExpiry = elements.create("cardExpiry");
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardNumber.addEventListener("change", this.cardHandler);


    this.cardCvc = elements.create("cardCvc");
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardNumber.addEventListener("change", this.cardHandler);

  };

  onChange({ error }) { //distructuring of the response object from stripe; getting only the error property
    this.cardErrors = error ? error.message : null;
  }

  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  createOrder = (event: any) => {
    this.stripe.confirmCardPayment(this.basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get("paymentForm").get("nameOnCard").value,
        },
      },
    })
      .then(result => {
        console.log(result);
        this.paymentSucceded = result.paymentIntent.status === "succeeded";
        // Handle result.error or result.paymentIntent
        if (result.paymentIntent) {
          this.createorderClickEvent.emit(event);
        } else {
          this.toastr.error(result.error, "Payment error");
        }
      });
  };
}
