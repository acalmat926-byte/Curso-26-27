import { Routes } from '@angular/router';
import { MaquetaInformeComponent } from './pages/maqueta-informe/maqueta-informe.component';
import { DatosBrutoComponent } from './pages/datos-bruto/datos-bruto.component';
import { InformePedidosComponent } from './pages/informe-pedidos/informe-pedidos.component';
import { InformeCsvComponent } from './pages/informe-csv/informe-csv.component';

export const routes: Routes = [
  { path: '', redirectTo: 'maqueta', pathMatch: 'full' },
  { path: 'maqueta', component: MaquetaInformeComponent },          
  { path: 'datos', component: DatosBrutoComponent },                
  { path: 'informe-pedidos', component: InformePedidosComponent },  
  { path: 'informe-csv', component: InformeCsvComponent }           
];
