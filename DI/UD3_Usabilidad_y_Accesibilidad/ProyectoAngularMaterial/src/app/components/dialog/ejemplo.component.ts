import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogoComponent } from './dialogo.component';

@Component({
  selector: 'app-ejemplo-dialogo',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `<button mat-raised-button (click)="abrir()">Eliminar</button>`,
})
export class EjemploComponent {
  private readonly dialog = inject(MatDialog);

  abrir(): void {
    const ref = this.dialog.open(DialogoComponent, { width: '350px' });

    ref.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        console.log('Elemento eliminado');
      }
    });
  }
}
