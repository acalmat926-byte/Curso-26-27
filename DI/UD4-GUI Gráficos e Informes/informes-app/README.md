# 5 · Proyecto base `informes-app`

## 5.1 Puesta en marcha

Requisitos: **Node.js 20 o superior** y npm.

```bash
cd informes-app
npm install
npm run dev
```

- Angular: <http://localhost:4200>
- API: <http://localhost:3000>

## 5.2 Estructura

```
informes-app/
├── db.json                      ← "base de datos" de json-server
├── public/data/ventas.csv       ← fuente CSV
├── angular.json · package.json · tsconfig*.json
└── src/
    ├── index.html · main.ts · styles.scss   ← tema de Angular Material
    └── app/
        ├── app.config.ts        ← provideHttpClient, router, idioma es
        ├── app.routes.ts        ← 4 rutas 
        ├── app.component.ts     ← toolbar con navegación
        ├── models/models.ts     ← interfaces Cliente, Producto, Pedido, VentaCsv
        ├── services/
        │   ├── api.service.ts   ← HttpClient → json-server
        │   └── csv.service.ts   ← HttpClient + PapaParse
        └── pages/
            ├── maqueta-informe/ 
            ├── datos-bruto/     
            ├── informe-pedidos/ 
            └── informe-csv/
```

## 5.3 Qué se ve en cada ruta

| Ruta | Qué demuestra |
|---|---|---|
| `/maqueta`  | Estructura de informe: cabecera, filtros, agrupaciones con subtotales, totales, pie. Botón de imprimir. |
| `/datos`  | Datos **en bruto** de la API y del CSV con el pipe `json`. |
| `/informe-pedidos`  | Tabla Material con datos de la API, ordenación (incluso en campos anidados), paginación y pipe `date`. |
| `/informe-csv`  | Tabla con datos del CSV leídos con PapaParse y pipe `currency`. |
