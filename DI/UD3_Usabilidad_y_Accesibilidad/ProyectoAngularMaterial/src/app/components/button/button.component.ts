import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'example-buttons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
})
export class ButtonsComponent {}