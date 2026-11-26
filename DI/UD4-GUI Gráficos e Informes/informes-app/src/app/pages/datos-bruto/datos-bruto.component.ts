import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { CsvService } from '../../services/csv.service';

/**
 * SESIÓN 2 · Mostrar los datos "en bruto" tal y como llegan
 * desde la API (json-server) y desde el CSV.
 */
@Component({
  selector: 'app-datos-bruto',
  standalone: true,
  imports: [JsonPipe, MatCardModule],
  template: `
    <div class="pagina">
      <h1>Datos en bruto</h1>

      <mat-card>
        <mat-card-header><mat-card-title>GET /clientes ({{ clientes().length }})</mat-card-title></mat-card-header>
        <mat-card-content><pre>{{ clientes() | json }}</pre></mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header><mat-card-title>GET /pedidos?_expand=... ({{ pedidos().length }})</mat-card-title></mat-card-header>
        <mat-card-content><pre>{{ pedidos() | json }}</pre></mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header><mat-card-title>ventas.csv ({{ ventas().length }})</mat-card-title></mat-card-header>
        <mat-card-content><pre>{{ ventas() | json }}</pre></mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    mat-card { margin-bottom: 16px; }
    pre { max-height: 220px; overflow: auto; font-size: 12px; background: #f6f6f6; padding: 8px; }
  `]
})
export class DatosBrutoComponent {
  private api = inject(ApiService);
  private csv = inject(CsvService);

  clientes = toSignal(this.api.getClientes(), { initialValue: [] });
  pedidos  = toSignal(this.api.getPedidos(),  { initialValue: [] });
  ventas   = toSignal(this.csv.getVentas(),   { initialValue: [] });
}
