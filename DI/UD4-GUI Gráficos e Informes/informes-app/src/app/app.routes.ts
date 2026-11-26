import { Routes } from '@angular/router';
import { MaquetaInformeComponent } from './pages/maqueta-informe/maqueta-informe.component';
import { DatosBrutoComponent } from './pages/datos-bruto/datos-bruto.component';
import { InformePedidosComponent } from './pages/informe-pedidos/informe-pedidos.component';
import { InformeCsvComponent } from './pages/informe-csv/informe-csv.component';

export const routes: Routes = [
  { path: '', redirectTo: 'maqueta', pathMatch: 'full' },
  { path: 'maqueta', component: MaquetaInformeComponent },          // Sesión 1
  { path: 'datos', component: DatosBrutoComponent },                // Sesión 2
  { path: 'informe-pedidos', component: InformePedidosComponent },  // Sesión 3 (API)
  { path: 'informe-csv', component: InformeCsvComponent }           // Sesión 3 (CSV)
];
