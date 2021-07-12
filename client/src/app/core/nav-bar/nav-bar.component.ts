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
  basket$: Observable<IBasket>;
  items: IBasketItem[];
  constructor(private basketService: BasketService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basket$.subscribe(basket => this.items = basket.items, err => console.log(err));
  }

  navigateToBasket = () => {
    if (this.items.length === 0)
      this.toastr.warning("Please add items in the basket first", "Basket empty");
    else this.router.navigateByUrl('/basket');
  };

}
