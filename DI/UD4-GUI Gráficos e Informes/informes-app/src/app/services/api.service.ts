import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, Pedido, Producto } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly url = 'http://localhost:3000';

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/clientes`);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/productos`);
  }

  getPedidos(): Observable<Pedido[]> {
    // _expand incrusta el cliente y el producto dentro de cada pedido
    return this.http.get<Pedido[]>(`${this.url}/pedidos?_expand=cliente&_expand=producto`);
  }
}
