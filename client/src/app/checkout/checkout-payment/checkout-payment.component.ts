import { UpperCasePipe } from '@angular/common';
import { OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { IBasket } from 'src/app/shared/model/basket';
import { IUserAddress } from 'src/app/shared/model/user';
import { StripeService } from 'src/app/stripe/stripe.service';
import { environment } from 'src/environments/environment';
import { CheckoutService } from '../checkout.service';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  stripePublishableKey = environment.stripePublicKey;
  stripeSecretKey = environment.stripeSecretKey;
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
  paymentSucceeded: boolean;
  checkOrderPaymentId: string;

  constructor(private toastr: ToastrService, private basketService: BasketService, private accountService: AccountService, private checkoutService: CheckoutService, private toastrService: ToastrService, private router: Router, private stripeService: StripeService, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.checkForExistingOrderId();
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

  completePayment = () => {
    this.basket = this.basketService.getCurrentBasketValue();
    const deliveryAddress: IUserAddress = this.checkoutForm.get("addressForm").value;


    const order = {
      basketId: localStorage.getItem("basket_id"),
      deliveryMethodId: this.basketService.getCurrentBasketValue().deliveryMethodId,
      deliveryAddress,
      orderStatus: "Pending",
      paymentIntentId: null
    };

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
        if (result.paymentIntent) {
          order.orderStatus = "Payment Received";
          this.checkoutService.createOrder(order).subscribe(
            () => {
              this.basketService.resetBasket();
              this.router.navigateByUrl("/shop");
              this.toastrService.success("Created order successfully", "Order submitted");
            }, err => this.toastrService.error(err.message, "Order error")
          );

        }
        else {
          order.orderStatus = "Payment Failed";
          order.paymentIntentId = this.basket.paymentIntentId;

          if (!this.checkOrderPaymentId) {
            this.checkoutService.createOrder(order).subscribe(
              () => this.toastrService.warning("Created order, payment issues though", result.error.message),
              err => this.toastrService.error(err.message, "Order error"));
          } else {
            this.toastrService.error(result.error.message);
          }

        }

      }
      );

  };



  private checkForExistingOrderId = () => {
    this.orderService.getOrders().subscribe(orders => {
      this.basket = this.basketService.getCurrentBasketValue();
      this.checkOrderPaymentId = orders.filter(o => o.paymentIntentId === this.basket.paymentIntentId)[0].paymentIntentId;
      console.log("existing order: " + this.checkOrderPaymentId);
    }
    );
  }




}
