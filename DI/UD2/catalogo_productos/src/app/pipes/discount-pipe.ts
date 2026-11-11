import { Pipe, PipeTransform } from '@angular/core';

/**
 * Aplica un descuento en porcentaje al precio inicial.
 * Uso: {{ price | discount: 10 }}  ->  precio con un 10 % menos.
 */
@Pipe({ name: 'discount' })
export class DiscountPipe implements PipeTransform {
  transform(price: number, percentage: number): number {
    if (percentage <= 0) {
      return price;
    }

    return price - (price * percentage) / 100;
  }
}
