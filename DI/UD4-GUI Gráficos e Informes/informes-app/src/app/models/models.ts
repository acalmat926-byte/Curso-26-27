export interface Cliente {
  id: number;
  nombre: string;
  ciudad: string;
  email: string;
}

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
}

export interface Pedido {
  id: number;
  clienteId: number;
  productoId: number;
  fecha: string;
  cantidad: number;
  estado: 'Pendiente' | 'Enviado' | 'Entregado';
  // Los rellena json-server con ?_expand=cliente&_expand=producto
  cliente?: Cliente;
  producto?: Producto;
}

export interface VentaCsv {
  fecha: string;
  vendedor: string;
  categoria: string;
  unidades: number;
  importe: number;
}
