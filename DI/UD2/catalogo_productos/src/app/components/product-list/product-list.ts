import { Component, computed, inject, signal, output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { ProductSearch } from '../product-search/product-search';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductSearch, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productService = inject(ProductService);
  // Texto actual del buscador, lo recibe de product-search y se actualiza cada vez que el usuario escribe
  searchTerm = signal('');

  // Filtra los productos según el término de búsqueda, tanto por nombre como por categoría
  protected readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const products = this.productService.getProducts();

    if (!term) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term),
    );
  });
  
  // Devuelve para cada producto si es favorito o no, usando el servicio de productos
  protected isFavorite(id: number): boolean {
    return this.productService.isFavorite(id);
  }

  // Se ejecuta cuando el usuario escribe en el buscador, actualiza el término de búsqueda
  protected onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  // Se ejecuta cuando en product-card se hace click en el botón de favorito. Cambia el estado del producto en favoritos.
  protected onToggleFavorite(product: Product): void {
    this.productService.cambiarFavorito(product);
  }
}
