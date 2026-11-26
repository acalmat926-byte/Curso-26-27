import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * 1 · Maqueta estática de un informe de ventas.
 * No hay datos reales: solo se dibuja la ESTRUCTURA
 * (cabecera, cuerpo con agrupaciones, pie y paginación).
 */
@Component({
  selector: 'app-maqueta-informe',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './maqueta-informe.component.html',
  styleUrl: './maqueta-informe.component.scss'
})
export class MaquetaInformeComponent {
  imprimir() { window.print(); }
}
