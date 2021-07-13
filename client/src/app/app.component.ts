import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Artnet';

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    const id = localStorage.getItem("basket_id");
    console.log(id);
    if (id)
      this.basketService.getBasket(id).subscribe(() =>
        console.log(this.basketService.basket$), err => console.log(err));
  }


}

