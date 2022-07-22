import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  cardDataList: any = [];
  productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  // get product data
  getProductData() {
    return this.productList.asObservable();
  }

  //set product data
  setProduct(product: any) {
    this.cardDataList.push(...product)
    this.productList.next(product)
  }

  // add to cart details
  addToCart(product: any) {
    this.cardDataList.push(product);
    this.productList.next(this.cardDataList);
    this.getTotalAmount();
    console.log(this.cardDataList);
  }

  // get total amount
  getTotalAmount() {
    let grandTotal = 0;
    this.cardDataList.map((a: any) => {
      grandTotal += a.total;
    })
  }

  // remove cart data one by one
  removeCartData(product: any) {
    this.cardDataList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cardDataList.splice(index, 1)
      }
      this.productList.next(this.cardDataList)
    })
  }

  // remove all data
  removeAllCart() {
    this.cardDataList = [];
    this.productList.next(this.cardDataList)
  }
}
