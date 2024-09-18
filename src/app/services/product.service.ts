import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { Subject, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = 'http://localhost:8080/product'

  public listProducts = new Subject<void>

  constructor(private httpClient: HttpClient) { }

  list()  {
    return this.httpClient.get<Product[]>(this.API).pipe(tap());
  }

  getById(id: string){
    return this.httpClient.get<Product>(`${this.API}/${id}`)
  }

  save(elements: Product){
    return this.httpClient.post<Product>(this.API, elements);
  }

  update(elements: Product) {
    return this.httpClient.put<Product>(`${this.API}/${elements.id}`, elements)
  }

  listProductObservable() {
    return this.listProducts.asObservable(); 
  }

  listProductAction(){
    return this.listProducts.next();
  }
}
