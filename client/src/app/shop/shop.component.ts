import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPagination, IProduct } from '../shared/model/product';
import { IAuthor, ICurrent, IType } from '../shared/model/product-details';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  types: IType[];
  currents: ICurrent[];
  authors: IAuthor[];
  typeSelected = 0;
  currentSelected = 0;
  authorSelected: number;
  sortSelected = '';
  sortOptions = [
    { name: 'A-Z', value: 'name' },
    { name: 'Price asc.', value: 'priceAsc' },
    { name: 'Price desc', value: 'priceDesc' }
  ]
  search: string;


  constructor(public shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    // this.getProductById(3);
    this.getProductTypes();
    this.getProductCurrents();
    this.getProductAuthors();
  }

  getProducts = () => this.shopService.getProducts(this.typeSelected, this.currentSelected, this.authorSelected, this.sortSelected, this.search)
    .subscribe((response: IPagination) => this.products = response.data, error => console.log(error));

  // getProductById = (id: number) => this.shopService.getProductById(id)
  //   .subscribe((response: IProduct) => console.log(response), error => console.log(error));

  getProductTypes = () => this.shopService.getProductTypes()
    .subscribe((response: IType[]) => this.types = [{ id: 0, name: 'All Types' }, ...response], error => console.log(error));

  getProductCurrents = () => this.shopService.getProductCurrents()
    .subscribe((response: ICurrent[]) => this.currents = [{ id: 0, name: 'All Currents' }, ...response], error => console.log(error));

  getProductAuthors = () => this.shopService.getProductAuthors()
    .subscribe((response: IAuthor[]) => this.authors = [{ id: 0, name: 'All Artists' }, ...response], error => console.log(error));

  onTypeSelected = (typeId: number) => {
    this.typeSelected = typeId;
    this.getProducts();
  }

  onCurrentSelected = (currentId: number) => {
    this.currentSelected = currentId;
    this.getProducts();
  }

  // onAuthorSelected = (authorId: number) => {
  //   this.authorSelected = authorId;
  //   this.getProducts();
  // }

  onSortSelected = (sort: string) => {
    this.sortSelected = sort;
    this.getProducts();
  }

  onSearch = () => {
    this.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onSearchReset = () => {
    this.searchTerm.nativeElement.value = '';
    this.search ='';
    this.getProducts();
  }
}
