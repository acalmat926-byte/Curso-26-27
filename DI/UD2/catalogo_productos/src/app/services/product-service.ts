import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

export const INITIALproducts: Product[] = [
  {
    id: 1,
    name: 'Razer Blade 15',
    price: 2299.0,
    category: 'Portátiles',
    imageUrl: 'images/Razer-Blade-15.png',
    inStock: true,
    reviews: [
      {
        id: 101,
        author: 'Lucía',
        rating: 5,
        comment: 'Va súper fluido y el chasis de aluminio se siente de altísima calidad.',
        date: '2026-01-12',
      },
      {
        id: 102,
        author: 'Marco',
        rating: 4,
        comment: 'Pantalla espectacular con gran tasa de refresco, aunque pesa un poco.',
        date: '2026-02-03',
      },
    ],
  },
  {
    id: 2,
    name: 'Razer BlackWidow V4',
    price: 169.99,
    category: 'Periféricos',
    imageUrl: 'images/Razer-BlackWidow-V4.png',
    inStock: true,
    reviews: [
      {
        id: 201,
        author: 'Sara',
        rating: 5,
        comment: 'La iluminación Chroma RGB y el tacto del switch mecánico son increíbles.',
        date: '2026-03-21',
      },
    ],
  },
  {
    id: 3,
    name: 'Razer DeathAdder V3 Pro',
    price: 149.99,
    category: 'Periféricos',
    imageUrl: 'images/Razer-DeathAdder-V3-Pro.png',
    inStock: true,
    reviews: [
      {
        id: 301,
        author: 'Nuria',
        rating: 4,
        comment: 'Ultraligero y muy preciso, la batería le dura semanas.',
        date: '2026-04-02',
      },
      {
        id: 302,
        author: 'Iván',
        rating: 3,
        comment: 'Ergonomía excelente, pero el clic óptico se siente algo duro.',
        date: '2026-04-18',
      },
    ],
  },
  {
    id: 4,
    name: 'Razer Raptor 27"',
    price: 799.99,
    category: 'Monitores',
    imageUrl: 'images/Razer-Raptor-27.png',
    inStock: true,
    reviews: [
      {
        id: 401,
        author: 'Elena',
        rating: 5,
        comment: 'La calibración de color del panel IPS va genial para edición y diseño.',
        date: '2026-05-05',
      },
    ],
  },
  {
    id: 5,
    name: 'Razer Opus ANC Wireless',
    price: 199.99,
    category: 'Audio',
    imageUrl: 'images/Razer-Opus.png',
    inStock: false,
    reviews: [
      {
        id: 501,
        author: 'Dani',
        rating: 4,
        comment: 'La cancelación activa de ruido (ANC) aísla de maravilla en la oficina.',
        date: '2026-05-27',
      },
    ],
  },
  {
    id: 6,
    name: 'Razer Kiyo Pro',
    price: 129.99,
    category: 'Accesorios',
    imageUrl: 'images/RAZER-KIYO.png',
    inStock: true,
    reviews: [],
  },
];

/**
 * Servicio singleton que centraliza el estado y la lógica de negocio
 * del catálogo. Los componentes solo consumen sus métodos públicos.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  products:Product[] = INITIALproducts;
  favorites = signal([] as number[]);

  /** Devuelve la lista completa de productos. */
  getProducts(): Product[] {
    return this.products;
  }

  /** Obtiene un producto por su id (o undefined si no existe). */
  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  /** Da de alta un producto nuevo y lo añade al catálogo. */
  addProduct(data: Omit<Product, 'id' | 'reviews'>): Product {
    const product: Product = { ...data, id: this.nextId(), reviews: [] };
    this.products = [...this.products, product];
    return product;
  }

  /** Indica si un producto está en favoritos. */
  isFavorite(id: number): boolean {
    return this.favorites().includes(id);
  }

  /** Devuelve los ids de los productos favoritos. */
  getFavorites(): number[] {
    return this.favorites();
  }

  /** Añade o quita un producto de favoritos. */
  cambiarFavorito(product: Product): void {
      // Si el producto ya está en favoritos, lo quitamos; si no, lo añadimos.
      if (this.favorites().includes(product.id)) {
        this.favorites.set(this.favorites().filter((id) => id !== product.id));
      }
      else {
       this.favorites.set([...this.favorites(), product.id]);
      }
  }

  private nextId(): number {
    return this.products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  }
}
