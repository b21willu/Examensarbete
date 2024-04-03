import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        // Filter out products with null or empty image_downloads
        const filteredProducts = data.filter(product => product.image_downloads !== null && product.image_downloads.length > 0);

        // Loop through the filtered products and clean up the image_downloads
        const cleanedProducts = filteredProducts.map(product => {
          return {
            ...product,
            // Remove [ and ' from image_downloads
            image_downloads: product.image_downloads.replace(/[\[\]']/g, '').split(', ')
          };
        });
        this.products = cleanedProducts;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}