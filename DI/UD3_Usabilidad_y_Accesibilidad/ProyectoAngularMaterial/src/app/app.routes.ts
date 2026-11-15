import { Routes } from '@angular/router';
import { ButtonsComponent } from './components/button/button.component';
import { FormularioComponent } from './components/form/form.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { EjemploComponent } from './components/dialog/ejemplo.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'botones', pathMatch: 'full' },
  { path: 'botones', component: ButtonsComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'tabla', component: TablaComponent },
  { path: 'dialogo', component: EjemploComponent },
  { path: 'notificacion', component: NotificacionComponent },
];
