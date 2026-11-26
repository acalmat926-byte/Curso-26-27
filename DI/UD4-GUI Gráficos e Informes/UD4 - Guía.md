# UD4· GUI. Gráficos e Informes.


# 1 · Estructura de un informe

## 1.1 ¿Qué es un informe?

Un **informe** es una presentación **ordenada, resumida y pensada para leerse o imprimir** de datos que normalmente están en una base de datos, una API o un archivo. No es lo mismo que una pantalla de gestión:

| Pantalla de aplicación | Informe |
|---|---|
| Se usa para **hacer** cosas (crear, editar, borrar) | Se usa para **consultar y decidir** |
| Interactiva | Orientada a lectura, exportación e impresión |
| Muestra lo que cabe en pantalla | Tiene páginas, totales y resúmenes |

## 1.2 Partes de un informe

```
┌─────────────────────────────────────────────┐
│ CABECERA DE INFORME  (logo, título, fecha)  │  ← 1 vez, al principio
├─────────────────────────────────────────────┤
│ Filtros aplicados (opcional)                │
├─────────────────────────────────────────────┤
│ CUERPO / DETALLE                            │
│  ┌ Cabecera de grupo: Cliente Ana Ruiz      │
│  │  fila fila fila                          │  ← se repite por registro
│  └ Pie de grupo: Subtotal                   │
│  ┌ Cabecera de grupo: Cliente Luis Pérez    │
│  │  fila                                    │
│  └ Pie de grupo: Subtotal                   │
├─────────────────────────────────────────────┤
│ RESUMEN FINAL (totales generales)           │  ← 1 vez, al final
├─────────────────────────────────────────────┤
│ PIE DE PÁGINA  (Página 1 de 3, fecha)       │  ← se repite en cada página
└─────────────────────────────────────────────┘
```

| Sección | Qué contiene | Cuántas veces aparece |
|---|---|---|
| **Cabecera de informe** | Logo, título, periodo, fecha de generación, autor | Una vez |
| **Cabecera de página** | Título corto, columnas (si se repiten) | En cada página |
| **Cuerpo (detalle)** | Las filas con los datos | Una por registro |
| **Agrupación** | Registros agrupados por un campo (cliente, mes, categoría) | Una por grupo |
| **Pie de grupo** | Subtotales y recuentos del grupo | Una por grupo |
| **Resumen / pie de informe** | Totales generales | Una vez |
| **Pie de página** | Nº de página, confidencialidad, fecha | En cada página |

## 1.3 Conceptos clave

- **Agrupación:** organizar los registros según el valor de un campo. Ejemplo: pedidos agrupados por cliente.
- **Paginación:** dividir el informe en páginas.
- **Valor calculado:** dato que no está en la fuente sino que se calcula (importe = cantidad × precio).
- **Totales, recuentos, medias:** agregaciones sobre las filas. 
- **Filtro:** condición que limita qué filas aparecen. 

## 1.4 Cómo se diseña un informe antes de programarlo

1. **¿Quién lo lee y para qué?** (el gerente quiere ver ventas por cliente)
2. **¿Qué datos necesita?** (cliente, fecha, producto, cantidad, importe)
3. **¿Cómo se agrupan?** (por cliente)
4. **¿Qué totales hacen falta?** (subtotal por cliente, total general)
5. **Boceto en papel o aplicaciones de diseño (Figma)** de la estructura.

---

# 2 · Fuentes de datos

Veremos dos fuentes habituales.

## 2.1 API REST con `json-server`

**`json-server`** convierte un archivo `db.json` en una API REST completa sin programar nada. Se usa para **simular un backend**.

**Paso 1.** Instalar json-server
```bash
npm install -D json-server
```

**Paso 2.** Crear el archivo de base de datos (db.json)

Cada clave principal actuará como un endpoint de la API

**Paso 3.** Configurar el script

Agrega un comando en la sección "scripts" de tu package.json para iniciarlo cómodamente:

```bash
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "api": "json-server --watch db.json --port 3000"  #configuración de api
}
```

**Paso 4.** - Levantar el servidor

```bash
npm run api        # arranca en http://localhost:3000
```
### Ejemplo


Con este `db.json`:

```json
{
  "clientes":  [ { "id": 1, "nombre": "Ana Ruiz" } ],
  "productos": [ { "id": 1, "nombre": "Portátil", "precio": 799.9 } ],
  "pedidos":   [ { "id": 1, "clienteId": 1, "productoId": 1, "cantidad": 1 } ]
}
```

se obtienen automáticamente estas rutas:

| Petición | Resultado |
|---|---|
| `GET /clientes` | Todos los clientes |
| `GET /clientes/1` | El cliente con id 1 |
| `GET /pedidos?estado=Enviado` | Pedidos filtrados |
| `GET /pedidos?_sort=fecha&_order=desc` | Ordenados |
| `GET /pedidos?_expand=cliente` | Pedidos con el objeto `cliente` incrustado (usa `clienteId`) |

> **Relaciones:** la clave `clienteId` apunta a la colección `clientes`. Con `_expand=cliente` json-server sustituye el id por el objeto completo. Es el equivalente a un `JOIN` de SQL.

Puedes probar la API directamente en el navegador: <http://localhost:3000/pedidos>.

## 2.2 Servicio con `HttpClient`

En Angular, el acceso a datos **no se programa en el componente**, sino en un **servicio** inyectable. Así se puede reutilizar y probar.

**Paso 1.** Activar `HttpClient` en `app.config.ts`:

```ts
provideHttpClient()
```

**Paso 2.** Crear el servicio:

```ts
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:3000/clientes');
  }
}
```

**Paso 3.** Usarlo en un componente:

```ts
export class DatosBrutoComponent {
  private api = inject(ApiService);
  clientes = toSignal(this.api.getClientes(), { initialValue: [] });
}
```

```html
<pre>{{ clientes() | json }}</pre>
```

### Conceptos que hay que entender

| Concepto | Explicación |
|---|---|
| **Observable** | Representa datos que llegarán **más tarde** (la respuesta HTTP es asíncrona). Hasta que alguien se suscribe, no se hace la petición. |
| **`subscribe()`** | Forma clásica de recibir el resultado: `api.getClientes().subscribe(datos => ...)` |
| **`toSignal()`** | Convierte un Observable en una *signal*; en la plantilla se lee como `clientes()`. Evita suscribirse a mano. |
| **Interfaz (`interface`)** | Define la forma de los datos (`Cliente`, `Pedido`). TypeScript avisa si te equivocas de campo. |
| **`inject()`** | Pide a Angular una instancia de un servicio. |
| **`json` pipe** | Muestra un objeto como texto JSON. Ideal para **depurar**. |

## 2.3 Fuente CSV

El **CSV** (*Comma-Separated Values*) es un texto plano con una fila por registro y valores separados por comas. Es el formato más común para intercambiar datos (Excel, bancos, ERPs).

```csv
fecha,vendedor,categoria,unidades,importe
2026-01-10,Carlos,Informática,3,2399.70
2026-01-24,Lucía,Periféricos,12,239.40
```

El archivo está en `public/data/ventas.csv`. Todo lo que está en `public/` se publica tal cual, así que Angular puede pedirlo con `HttpClient`:

```ts
this.http.get('data/ventas.csv', { responseType: 'text' })
```

> `responseType: 'text'` es obligatorio: por defecto `HttpClient` espera JSON y fallaría.

### Interpretar el CSV con PapaParse

**PapaParse** es una librería que convierte el texto CSV en un array de objetos.

```bash
npm install papaparse
npm install -D @types/papaparse
```

```ts
import * as Papa from 'papaparse';

const resultado = Papa.parse<VentaCsv>(texto, {
  header: true,         // la primera fila son los nombres de campo
  dynamicTyping: true,  // "12" pasa a ser el número 12
  skipEmptyLines: true
});
resultado.data; // → [{ fecha: '2026-01-10', vendedor: 'Carlos', ... }, ...]
```

Sin `header: true` obtendrías arrays de arrays; sin `dynamicTyping`, todos los valores serían texto.

> **Nota:** como PapaParse es una librería CommonJS, en `angular.json` aparece `"allowedCommonJsDependencies": ["papaparse"]` para evitar un aviso en la compilación.


---

# 3 · Informes básicos con asistentes

## 3.1 ¿Qué es un asistente (schematic)?

Un **schematic** es una plantilla que el Angular CLI ejecuta para **generar archivos de código automáticamente**. Angular Material incluye varios que crean componentes ya montados:

```bash
ng generate @angular/material:table informe-pedidos
ng generate @angular/material:dashboard panel-ventas
```

| Schematic | Qué genera | Uso en informes |
|---|---|---|
| `table` | Tabla con `mat-table`, ordenación y paginación | Informes tabulares |
| `dashboard` | Cuadrícula de tarjetas (`mat-grid-list` + `mat-card`) | Paneles con gráficos  |

> **Idea importante:** el schematic genera código con **datos de ejemplo**. Tu trabajo es **modificarlo** para conectarlo a datos reales.

## 3.2 Qué archivos genera `table`

Dependiendo de la versión del CLI, el nombre de los archivos puede cambiar (`informe-pedidos.component.ts` o `informe-pedidos.ts`), pero genera siempre lo mismo:

| Archivo | Contenido |
|---|---|
| `.ts` | Componente: columnas, `MatPaginator`, `MatSort`, datos |
| `.html` | Plantilla con `<table mat-table>`, columnas y `<mat-paginator>` |
| `.scss` | Estilos |
| `.spec.ts` | Pruebas unitarias |
| `...-datasource.ts` | `DataSource` con datos falsos, ordenación y paginación manual |

## 3.3 Anatomía de una tabla de Angular Material

```html
<table mat-table [dataSource]="dataSource" matSort>

  <!-- Una definición por cada columna -->
  <ng-container matColumnDef="cliente">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Cliente</th>
    <td mat-cell *matCellDef="let p">{{ p.cliente?.nombre }}</td>
  </ng-container>

  <!-- Qué columnas se muestran y en qué orden -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
</table>

<mat-paginator [pageSizeOptions]="[5, 10, 25]" [pageSize]="5" />
```

| Elemento | Función |
|---|---|
| `matColumnDef="x"` | Define una columna con nombre `x` |
| `*matHeaderCellDef` | Plantilla de la **cabecera** de la columna |
| `*matCellDef="let p"` | Plantilla de la **celda**; `p` es la fila actual |
| `displayedColumns` | Array con los nombres de las columnas visibles, **en orden** |
| `matSort` / `mat-sort-header` | Activa la ordenación al hacer clic en la cabecera |
| `mat-paginator` | Paginador (anterior, siguiente, tamaño de página) |


## 3.5 Pipes de formato

Usar pipes para cambiar el dato a un formato deseado

## 3.6 Flujo de trabajo con el asistente

1. **Generar** el componente: `ng generate @angular/material:table informe-pedidos`
2. **Registrar** la ruta en `app.routes.ts`.
3. **Borrar** los datos de ejemplo y el `DataSource` generado (si usas `MatTableDataSource`).
4. **Definir** el modelo (`interface Pedido`).
5. **Inyectar** el servicio y cargar los datos reales.
6. **Ajustar** columnas, cabeceras y formatos.
7. **Comprobar** ordenación y paginación.



---


# 6 · Autoevaluación

**Sesión 1 (criterio a)**
1. ¿Qué diferencia hay entre cabecera de informe y cabecera de página?
2. ¿Dónde colocarías el subtotal por cliente?
3. ¿Por qué se diseña un boceto antes de programar?

**Sesión 2 (criterio b)**
4. ¿Para qué sirve `json-server`?
5. ¿Qué hace `_expand=cliente`?
6. ¿Por qué el acceso a datos va en un servicio y no en el componente?
7. ¿Qué hace `header: true` en PapaParse?

**Sesión 3 (criterio b)**
8. ¿Qué es un schematic y qué genera `@angular/material:table`?
9. ¿Por qué se asigna el paginador en `ngAfterViewInit`?
10. ¿Qué cambia entre el informe de la API y el del CSV? ¿Qué se mantiene igual?


### Actividad práctica 1
1. Busca **3 informes reales** (factura, extracto bancario, boletín de notas, informe de ventas…) e identifica en cada uno: cabecera, cuerpo, agrupaciones, pie, totales.
2. Dibuja en papel o Figma un informe de **Ventas** con esas partes.
3. Crea tu proyecto Angular y reproduce la maqueta (o parte de la del proyecto base) con tu propio diseño.


### Actividad práctica 2
1. Arranca la API con `npm run api` y prueba en el navegador `/clientes`, `/pedidos` y `/pedidos?_expand=cliente`.
2. Crea un servicio con `ng generate service services/api` y añade `getClientes()`, `getProductos()` y `getPedidos()`.
3. Muestra los tres resultados en bruto con el pipe `json`.
4. Crea un `CsvService` que lea `ventas.csv` con PapaParse y muéstralo también en bruto.
5. **Ampliación:** añade 2 clientes nuevos a `db.json` y comprueba que aparecen sin reiniciar nada.




### Actividad práctica 3
1. Genera `informe-pedidos` con el asistente `table` y registra su ruta.
2. Conéctalo a la API. Columnas: Nº, Fecha, Cliente, Producto, Cantidad, Estado.
3. Comprueba que ordenar por **Cliente** y **Producto** funciona y que la fecha sale `dd/MM/yyyy`.
4. Genera `informe-csv` y muéstralo con las columnas del CSV; el importe debe salir con formato moneda.
5. Genera también un `dashboard` (`ng generate @angular/material:dashboard panel`) y observa su estructura. *No hace falta rellenarlo todavía: se usará en la sesión 8.*
6. **Entrega:** capturas de ambos informes y repositorio con un commit por sesión.
