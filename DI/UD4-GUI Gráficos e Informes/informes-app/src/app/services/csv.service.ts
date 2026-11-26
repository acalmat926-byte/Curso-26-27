import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as Papa from 'papaparse';
import { VentaCsv } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CsvService {
  private http = inject(HttpClient);

  getVentas(): Observable<VentaCsv[]> {
    // El CSV está en public/data/ventas.csv y se sirve como archivo estático
    return this.http.get('data/ventas.csv', { responseType: 'text' }).
      //Con pipe se transformar el texto obtenido
      pipe(
        // Papa.parse() convierte el CSV en un array de objetos VentaCsv
        map(texto =>
          Papa.parse<VentaCsv>(texto, {
            header: true,          // la 1ª fila son los nombres de columna
            dynamicTyping: true,   // convierte "12" en número
            skipEmptyLines: true
          }).data
        )
      );
  }
}
