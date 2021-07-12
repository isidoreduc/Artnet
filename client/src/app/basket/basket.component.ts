import { Component, OnInit } from '@angular/core';
import { Basket } from '../shared/model/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
