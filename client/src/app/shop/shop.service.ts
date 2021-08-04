import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination, IProduct } from '../shared/model/product';
import { IAuthor, ICurrent, IType } from '../shared/model/product-details';
import { ShopParams } from '../shared/model/shop-params';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseurl = environment.apiUrl;
  // get data in services, not in components, to take advantage of caching; angular destroys components when we navigate away, so we lose data from components; services are singletons
  products: IProduct[] = [];
  types: IType[] = [];
  currents: ICurrent[] = [];
  authors: IAuthor[] = [];

  constructor(private http: HttpClient) { }

  getProducts = (shopParams: ShopParams) => {
    let params = new HttpParams();
    params = shopParams.typeId !== 0 ? params.append('typeId', shopParams.typeId.toString()) : params;
    params = shopParams.currentId !== 0 ? params.append('currentId', shopParams.currentId.toString()) : params;
    params = shopParams.authorId !== 0 ? params.append('authorId', shopParams.authorId.toString()) : params;
    params = shopParams.sort ? params.append('sort', shopParams.sort) : params;
    params = shopParams.search ? params.append('search', shopParams.search) : params;
    params = params.append("pageIndex", shopParams.pageIndex.toString());
    params = params.append("pageSize", shopParams.pageSize.toString());
    return this.http.get<IPagination>(this.baseurl + "products", { params: params })
      .pipe(map(p => {
        this.products = p.data;
        return p;
      }));
  };

  getProductById = (id: number) => {
    const product = this.products.find(p => p.id === id);
    if (product)
      return of(product); // if already cached, get it from there, non need to go to db
    return this.http.get<IProduct>(this.baseurl + `products/${id}`);
  };

  getProductTypes = () => {
    return this.types.length > 0 ? of(this.types) : // if already cached, get it from there, non need to go to db
      this.http.get<IType[]>(this.baseurl + 'products/types')
        .pipe(map(t => {
          this.types = t;
          return t;
        }));
  };

  getProductAuthors = () => {
    return this.authors.length > 0 ? of(this.authors) :
      this.http.get<IType[]>(this.baseurl + 'products/authors')
        .pipe(map(a => {
          this.authors = a;
          return a;
        }));
  };

  getProductCurrents = () => {
    return this.currents.length > 0 ? of(this.currents) :
    this.http.get<IType[]>(this.baseurl + 'products/currents')
      .pipe(map(c => {
        this.currents = c;
        return c;
      }));
  };
}
