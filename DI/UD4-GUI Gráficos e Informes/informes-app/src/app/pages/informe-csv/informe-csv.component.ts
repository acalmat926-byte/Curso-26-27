import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CsvService } from '../../services/csv.service';

/**
 * Segundo informe, ahora con una fuente distinta (archivo CSV
 * leído con PapaParse a través de CsvService).
 */
@Component({
  selector: 'app-informe-csv',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, MatTableModule, MatCardModule],
  template: `
    <div class="pagina">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Informe de ventas por vendedor</mat-card-title>
          <mat-card-subtitle>Fuente: ventas.csv</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="ventas()">
            <ng-container matColumnDef="fecha">
              <th mat-header-cell *matHeaderCellDef>Fecha</th>
              <td mat-cell *matCellDef="let v">{{ v.fecha | date: 'dd/MM/yyyy' }}</td>
            </ng-container>
            <ng-container matColumnDef="vendedor">
              <th mat-header-cell *matHeaderCellDef>Vendedor</th>
              <td mat-cell *matCellDef="let v">{{ v.vendedor }}</td>
            </ng-container>
            <ng-container matColumnDef="categoria">
              <th mat-header-cell *matHeaderCellDef>Categoría</th>
              <td mat-cell *matCellDef="let v">{{ v.categoria }}</td>
            </ng-container>
            <ng-container matColumnDef="unidades">
              <th mat-header-cell *matHeaderCellDef class="num">Unidades</th>
              <td mat-cell *matCellDef="let v" class="num">{{ v.unidades }}</td>
            </ng-container>
            <ng-container matColumnDef="importe">
              <th mat-header-cell *matHeaderCellDef class="num">Importe</th>
              <td mat-cell *matCellDef="let v" class="num">{{ v.importe | currency: 'EUR' }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columnas"></tr>
            <tr mat-row *matRowDef="let row; columns: columnas"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`table { width: 100%; } .num { text-align: right; }`]
})
export class InformeCsvComponent {
  private csv = inject(CsvService);
  columnas = ['fecha', 'vendedor', 'categoria', 'unidades', 'importe'];
  ventas = toSignal(this.csv.getVentas(), { initialValue: [] });
}
