import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { Pedido } from '../../models/models';

/**
 *  3 · Informe tabular.
 * Estructura generada con:  ng generate @angular/material:table informe-pedidos
 * y MODIFICADA para usar la API real en lugar de datos de ejemplo.
 */
@Component({
  selector: 'app-informe-pedidos',
  standalone: true,
  imports: [DatePipe, MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule],
  templateUrl: './informe-pedidos.component.html',
  styleUrl: './informe-pedidos.component.scss'
})
export class InformePedidosComponent implements AfterViewInit {
  private api = inject(ApiService);

  displayedColumns = ['id', 'fecha', 'cliente', 'producto', 'cantidad', 'estado'];
  dataSource = new MatTableDataSource<Pedido>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Para ordenar por columnas que son objetos anidados
    this.dataSource.sortingDataAccessor = (p, columna) => {
      switch (columna) {
        case 'cliente':  return p.cliente?.nombre ?? '';
        case 'producto': return p.producto?.nombre ?? '';
        default:         return (p as any)[columna];
      }
    };

    this.api.getPedidos().subscribe(datos => (this.dataSource.data = datos));
  }
}
