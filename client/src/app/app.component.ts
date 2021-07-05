import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination, IProduct } from './model/product'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Artnet';
  products: IProduct[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts = () => this.http.get<IPagination>("https://localhost:5001/api/products?pagesize=50")
    .subscribe((response: IPagination) => this.products = response.data, error => console.log(error));
}

