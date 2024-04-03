import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
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
}
