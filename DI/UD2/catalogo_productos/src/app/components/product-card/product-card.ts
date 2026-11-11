import { Component, input, output } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  selector: 'app-product-card',
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    NgOptimizedImage,
    RouterLink,
    DiscountPipe,
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  //Atributos de entrada
  product = input.required<Product>();
  isFavorite = input(false);
  //Atributos de salida
  favoriteOutput = output<Product>();
}
