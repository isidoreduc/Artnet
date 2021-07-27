import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { v4 as uuidv4 } from 'uuid';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Artnet';

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }

  loadBasket = () => {
    const id = localStorage.getItem("basket_id");
    console.log(id);
    if (id)
      this.basketService.getBasket(id).subscribe(() =>
        console.log(this.basketService.basket$), err => console.log(err));
  };


  loadUser = () => {
    const token = localStorage.getItem("token");
    this.accountService.loadCurrentUser(token).subscribe(() =>
      console.log(this.accountService.user$), err => console.log(err));
  };

}

