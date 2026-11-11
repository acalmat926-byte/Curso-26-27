import { Component, inject, input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { ProductReviews } from '../product-reviews/product-reviews';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    NgOptimizedImage,
    RouterLink,
    DiscountPipe,
    ProductReviews,
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
    productService = inject(ProductService);
    //id pasado por parámetro de ruta, por ejemplo: /producto/1
    id = input.required<string>();

    product: Product | undefined = undefined;
    isFavorite: boolean = false;

    //ngOnInit se ejecuta cuando el componente se inicializa
    ngOnInit(): void {
      this.product = this.productService.getProductById(Number(this.id()));
    }

    cambiarFavorito(): void {
      if (this.product) {
        this.productService.cambiarFavorito(this.product);
      }
    }
}
