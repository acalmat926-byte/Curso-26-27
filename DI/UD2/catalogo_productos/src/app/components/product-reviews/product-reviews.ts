import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Review } from '../../models/product';

@Component({
  selector: 'app-product-reviews',
  imports: [DatePipe],
  templateUrl: './product-reviews.html',
  styleUrl: './product-reviews.css',
})
export class ProductReviews {
  // Recibe la lista de opiniones del producto, que le pasa product-card
  readonly reviews = input.required<Review[]>();
}