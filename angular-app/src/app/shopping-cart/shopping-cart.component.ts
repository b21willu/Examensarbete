import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  constructor(private cartService: CartService) {}

  get cart(): any[] {
    return this.cartService.getCart();
  }

  removeFromCart(sku: string): void {
    this.cartService.removeFromCart(sku);
  }

  calculateTotalPrice(): number {
    return this.cart.reduce((total, product) => total + parseFloat(product.price), 0);
  }
}