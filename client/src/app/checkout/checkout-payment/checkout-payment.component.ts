import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { IBasket } from 'src/app/shared/model/basket';
import { IUserAddress } from 'src/app/shared/model/user';
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
  loading = false;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toastrService: ToastrService, private router: Router, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.checkForExistingOrderPaymentIntentId();
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

  completePayment = async () => {
    this.loading = true;
    this.basket = this.basketService.getCurrentBasketValue();

    const order = {
      basketId: this.basket.id,
      deliveryMethodId: this.basketService.getCurrentBasketValue().deliveryMethodId,
      deliveryAddress: this.checkoutForm.get("addressForm").value,
      orderStatus: "Pending",
    };

    try {
      const createdOrder = await this.checkoutService.createOrder(order).toPromise();
      const paymentResult = await this.stripe.confirmCardPayment(this.basket.clientSecret, {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: this.checkoutForm.get("paymentForm").get("nameOnCard").value,
          },
        },
      });

      if (paymentResult.paymentIntent) {
        this.basketService.resetBasket();
        this.router.navigateByUrl("/shop");
        this.toastrService.success("Created order successfully", "Order submitted");
      }
      else {
        this.toastrService.error(paymentResult.error.message);
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };



  private checkForExistingOrderPaymentIntentId = () => {
    this.orderService.getOrders().subscribe(orders => {
      this.basket = this.basketService.getCurrentBasketValue();
      this.checkOrderPaymentId = orders.filter(o => o.paymentIntentId === this.basket.paymentIntentId)[0].paymentIntentId;
      console.log("existing order: " + this.checkOrderPaymentId);
    }
    );
  };




}
