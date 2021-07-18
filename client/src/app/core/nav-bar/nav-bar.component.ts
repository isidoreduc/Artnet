import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/model/basket';
import { IUser } from 'src/app/shared/model/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket: IBasket;
  basket$: Observable<IBasket>;
  user$: Observable<IUser>;

  constructor(private basketService: BasketService, private toastr: ToastrService, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.user$ = this.accountService.user$;
  }

  navigateToBasket = () => {
    this.basket = this.basketService.getCurrentBasketValue();
    if (!this.basket)
      this.toastr.warning("Please add items in the basket first", "Basket empty");
    else this.router.navigateByUrl('/basket');
  };

}
