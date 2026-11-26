import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Informes App</span>
      <span class="espacio"></span>
      <a mat-button routerLink="/maqueta" routerLinkActive="activo">1 · Maqueta</a>
      <a mat-button routerLink="/datos" routerLinkActive="activo">2 · Datos</a>
      <a mat-button routerLink="/informe-pedidos" routerLinkActive="activo">3 · Informe API</a>
      <a mat-button routerLink="/informe-csv" routerLinkActive="activo">3 · Informe CSV</a>
    </mat-toolbar>
    <router-outlet />
  `,
  styles: [`
    .espacio { flex: 1; }
    .activo { background: rgba(255,255,255,.2); }
  `]
})
export class AppComponent {}
