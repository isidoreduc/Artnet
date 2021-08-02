import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/model/basket';
import { StripeService } from 'src/app/stripe/stripe.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketValue: IBasket;
  checkForPaymentIntentId: string;

  constructor(private basketService: BasketService, private stripeService: StripeService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketValue = this.basketService.getCurrentBasketValue();
    this.checkForPaymentIntentId = this.basketValue.paymentIntentId;
  }




  createOrUpdateStripeIntent = () => {
    if (!this.checkForPaymentIntentId) { // create intent only if there is not one yet
      this.stripeService.createOrUpdateIntent(this.basketValue.id)
        .subscribe(() =>
          this.toastrService.success("Created payment intent", "Success"),
          err => console.log(err.message)
        );
    }
  };
}
