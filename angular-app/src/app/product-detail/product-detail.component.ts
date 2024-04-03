import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const sku = params['sku'];
      this.productService.getProduct(sku).subscribe((data: any) => {
        // Manipulera bildsträngen här för att rensa bort oönskade tecken
        data.image_downloads = data.image_downloads.map((image: string) => {
          return image.replace(/[\'\"\[\]]+/g, '');
        });
        this.product = data;
      }, error => {
        console.error('Error fetching product details:', error);
      });
    });
  }

  addToCart(): void {
    const sku = this.product.sku;
    this.cartService.addToCart(this.product, sku);
    alert('Produkten har lagts till i kundvagnen.');
  }
}
