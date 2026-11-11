import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { ProductForm } from './components/product-form/product-form';

export const routes: Routes = [
  // La raíz redirige al catálogo
  { path: '', pathMatch: 'full', redirectTo: 'productos' },

  // Rutas estáticas
  { path: 'productos', component: ProductList, title: 'Catálogo · Tech Store' },
  { path: 'nuevo-producto', component: ProductForm, title: 'Nuevo producto · Tech Store' },

  // Ruta dinámica con parámetro
  { path: 'producto/:id', component: ProductDetail, title: 'Detalle · Tech Store' },

  // Comodín: SIEMPRE la última
  { path: '**', redirectTo: 'productos' },
];
