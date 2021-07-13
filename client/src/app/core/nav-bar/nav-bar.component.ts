import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/model/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket: IBasket;
  basket$: Observable<IBasket>;
  constructor(private basketService: BasketService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  navigateToBasket = () => {
    this.basket = this.basketService.getCurrentBasketValue();
    if (!this.basket)
      this.toastr.warning("Please add items in the basket first", "Basket empty");
    else this.router.navigateByUrl('/basket');
  };

}
