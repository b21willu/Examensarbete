import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() { }

  getCart(): any[] {
    return this.cart;
  }

  addToCart(product: any, sku: string): void {
    const productWithSku = { ...product, sku: sku };
    this.cart.push(productWithSku);
  }

  removeFromCart(skuToRemove: string): void {
    this.cart = this.cart.filter(product => product.sku !== skuToRemove);
  }
}