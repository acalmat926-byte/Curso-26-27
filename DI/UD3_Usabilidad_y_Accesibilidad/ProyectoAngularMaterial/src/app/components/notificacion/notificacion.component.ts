import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule],
  template: `<button mat-button (click)="mostrar()">Guardar</button>`,
})
export class NotificacionComponent {
  private readonly snackBar = inject(MatSnackBar);

  mostrar(): void {
    this.snackBar.open('Guardado correctamente', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
