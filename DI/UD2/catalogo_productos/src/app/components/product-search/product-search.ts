import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch {
  // Texto actual del buscador, lo recibe de product-list y se actualiza cada vez que el usuario escribe
  term = input('');

  //Avisa a product-list que el usuario ha escrito algo en el buscador, para que actualice la lista de productos
  searchChange = output<string>();

  // Se ejecuta cuando el usuario escribe en el buscador, emite el nuevo valor a product-list
  onInput(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }
}