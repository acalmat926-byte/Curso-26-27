import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tabla.component.html',
})
export class TablaComponent {
  columnas: string[] = ['id', 'nombre', 'email'];

  usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana', email: 'ana@ejemplo.com' },
    { id: 2, nombre: 'Luis', email: 'luis@ejemplo.com' },
    { id: 3, nombre: 'Marta', email: 'marta@ejemplo.com' },
  ];
}
