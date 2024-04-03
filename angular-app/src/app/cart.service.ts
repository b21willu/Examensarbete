import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private cart: any[] = this.getCartFromLocalStorage() || [];

  constructor() { }

  getCart(): any[] {
    return this.cart;
  }

  addToCart(product: any, sku: string): void {
    const productWithSku = { ...product, sku: sku };
    this.cart.push(productWithSku);
    this.saveCartToLocalStorage();
  }

  removeFromCart(skuToRemove: string): void {
    const indexToRemove = this.cart.findIndex(product => product.sku === skuToRemove);
    if (indexToRemove !== -1) {
      this.cart.splice(indexToRemove, 1);
      this.saveCartToLocalStorage();
    }
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  private getCartFromLocalStorage(): any[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }
}