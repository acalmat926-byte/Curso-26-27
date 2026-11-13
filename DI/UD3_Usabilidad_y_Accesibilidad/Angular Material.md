# 🅰️ Angular Material

Guía rápida para entender qué es **Angular Material**, cómo instalarlo y cómo usarlo con ejemplos prácticos.

## 📑 Índice

- [¿Qué es Angular Material?](#qué-es-angular-material)
- [¿Para qué sirve?](#para-qué-sirve)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejemplos de uso](#ejemplos-de-uso)
  - [1. Botones](#1-botones)
  - [2. Formularios](#2-formularios)
  - [3. Tabla de datos](#3-tabla-de-datos)
  - [4. Diálogo (modal)](#4-diálogo-modal)
  - [5. Snackbar (notificaciones)](#5-snackbar-notificaciones)
  - [6. Barra de herramientas](#6-barra-de-herramientas)
- [Temas y personalización](#temas-y-personalización)
- [Componentes más usados](#componentes-más-usados)
- [Recursos útiles](#recursos-útiles)

---

## ¿Qué es Angular Material?

**Angular Material** es la librería oficial de componentes de interfaz de usuario (UI) para Angular, mantenida por el equipo de Angular. Implementa los principios de **[Material Design](https://m3.material.io/)**, el sistema de diseño de Google, mediante componentes ya construidos, accesibles y listos para usar.

Forma parte de **Angular Components**, junto con el **CDK (Component Dev Kit)**, un conjunto de herramientas de bajo nivel para construir tus propios componentes (overlays, drag & drop, scroll virtual, accesibilidad, etc.).

## ¿Para qué sirve?

- 🎨 **Interfaces consistentes y modernas** sin tener que escribir todo el CSS desde cero.
- ⚡ **Desarrollo más rápido**: botones, formularios, tablas, diálogos, menús, etc. ya listos.
- ♿ **Accesibilidad (a11y)**: los componentes siguen buenas prácticas de accesibilidad (ARIA, navegación por teclado).
- 📱 **Diseño responsive**: componentes que se adaptan a distintos tamaños de pantalla.
- 🎛️ **Temas personalizables**: puedes adaptar colores y tipografía a tu marca.
- ✅ **Soporte oficial**: se actualiza junto con cada versión de Angular.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión compatible con tu versión de Angular)
- [Angular CLI](https://angular.dev/tools/cli)
- Un proyecto Angular existente

```bash
# Instalar Angular CLI (si no lo tienes)
npm install -g @angular/cli

# Crear un proyecto nuevo (opcional)
ng new mi-proyecto
cd mi-proyecto
```

## Instalación

La forma recomendada es usar el schematic de Angular CLI:

```bash
ng add @angular/material
```

Durante la instalación, el CLI te preguntará:

1. **Tema** a usar (puedes elegir uno predefinido o uno personalizado).
2. Si quieres configurar **tipografía global** de Angular Material.
3. Si quieres incluir y habilitar **animaciones** (según la versión).

Este comando se encarga automáticamente de:

- Instalar `@angular/material` y `@angular/cdk`.
- Añadir el tema a los estilos globales (`styles.scss` / `angular.json`).
- Incluir la fuente **Roboto** y los **Material Icons** en `index.html`.

### Instalación manual (alternativa)

```bash
npm install @angular/material @angular/cdk
```

Después tendrías que configurar el tema y las fuentes por tu cuenta.

> 💡 **Nota:** los pasos exactos pueden variar según la versión de Angular. Consulta siempre la [documentación oficial](https://material.angular.dev/guide/getting-started).

## Ejemplos de uso

Desde Angular 14+ se recomienda usar **componentes standalone**, importando directamente los módulos de Material que necesites en cada componente.

### 1. Botones

**`app.component.ts`**

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

**`app.component.html`**

```html
<button mat-button>Básico</button>
<button mat-raised-button color="primary">Elevado</button>
<button mat-flat-button>Plano</button>
<button mat-stroked-button>Con borde</button>

<button mat-icon-button aria-label="Favorito">
  <mat-icon>favorite</mat-icon>
</button>

<button mat-fab aria-label="Añadir">
  <mat-icon>add</mat-icon>
</button>
```

### 2. Formularios

**`formulario.component.ts`**

```typescript
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './formulario.component.html',
})
export class FormularioComponent {
  form = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    pais: [''],
    acepto: [false, Validators.requiredTrue],
  });

  constructor(private fb: FormBuilder) {}

  enviar() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

**`formulario.component.html`**

```html
<form [formGroup]="form" (ngSubmit)="enviar()">
  <mat-form-field appearance="outline">
    <mat-label>Nombre</mat-label>
    <input matInput formControlName="nombre" />
    <mat-error>El nombre es obligatorio</mat-error>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Email</mat-label>
    <input matInput type="email" formControlName="email" />
    <mat-error>Introduce un email válido</mat-error>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>País</mat-label>
    <mat-select formControlName="pais">
      <mat-option value="es">España</mat-option>
      <mat-option value="mx">México</mat-option>
      <mat-option value="ar">Argentina</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-checkbox formControlName="acepto">Acepto los términos</mat-checkbox>

  <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
    Enviar
  </button>
</form>
```

### 3. Tabla de datos

**`tabla.component.ts`**

```typescript
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tabla.component.html',
})
export class TablaComponent {
  columnas: string[] = ['id', 'nombre', 'email'];

  usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana', email: 'ana@ejemplo.com' },
    { id: 2, nombre: 'Luis', email: 'luis@ejemplo.com' },
    { id: 3, nombre: 'Marta', email: 'marta@ejemplo.com' },
  ];
}
```

**`tabla.component.html`**

```html
<table mat-table [dataSource]="usuarios" class="mat-elevation-z4">
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef>ID</th>
    <td mat-cell *matCellDef="let u">{{ u.id }}</td>
  </ng-container>

  <ng-container matColumnDef="nombre">
    <th mat-header-cell *matHeaderCellDef>Nombre</th>
    <td mat-cell *matCellDef="let u">{{ u.nombre }}</td>
  </ng-container>

  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef>Email</th>
    <td mat-cell *matCellDef="let u">{{ u.email }}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="columnas"></tr>
  <tr mat-row *matRowDef="let fila; columns: columnas"></tr>
</table>
```

> Para paginación, ordenación y filtrado, combina `MatTableDataSource` con `MatPaginatorModule`, `MatSortModule` y `MatInputModule`.

### 4. Diálogo (modal)

**`dialogo.component.ts`**

```typescript
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialogo',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>¿Eliminar elemento?</h2>
    <mat-dialog-content>Esta acción no se puede deshacer.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Eliminar</button>
    </mat-dialog-actions>
  `,
})
export class DialogoComponent {}
```

**Abrir el diálogo desde otro componente:**

```typescript
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogoComponent } from './dialogo.component';

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [MatButtonModule],
  template: `<button mat-raised-button (click)="abrir()">Eliminar</button>`,
})
export class EjemploComponent {
  private dialog = inject(MatDialog);

  abrir() {
    const ref = this.dialog.open(DialogoComponent, { width: '350px' });

    ref.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        console.log('Elemento eliminado');
      }
    });
  }
}
```

### 5. Snackbar (notificaciones)

```typescript
import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule],
  template: `<button mat-button (click)="mostrar()">Guardar</button>`,
})
export class NotificacionComponent {
  private snackBar = inject(MatSnackBar);

  mostrar() {
    this.snackBar.open('Guardado correctamente', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
```

### 6. Barra de herramientas

```typescript
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button aria-label="Menú">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Mi Aplicación</span>
      <span style="flex: 1 1 auto"></span>
      <button mat-icon-button aria-label="Buscar">
        <mat-icon>search</mat-icon>
      </button>
    </mat-toolbar>
  `,
})
export class HeaderComponent {}
```

## Temas y personalización

Angular Material usa **Sass** para definir temas. Un ejemplo básico en `styles.scss` (la sintaxis exacta depende de la versión instalada):

```scss
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: mat.$azure-palette,
    typography: Roboto,
    density: 0
  ));
}
```

Puedes elegir otras paletas predefinidas (`$azure-palette`, `$violet-palette`, `$rose-palette`, etc.) o definir la tuya propia.

> ⚠️ En versiones anteriores a la 18/19 se usaban funciones como `mat.define-light-theme()` y `mat.all-component-themes()`. Revisa la [guía de theming](https://material.angular.dev/guide/theming) para tu versión.

## Componentes más usados

| Categoría | Componentes |
|---|---|
| **Formularios** | `MatFormField`, `MatInput`, `MatSelect`, `MatCheckbox`, `MatRadio`, `MatDatepicker`, `MatSlider`, `MatAutocomplete`, `MatSlideToggle` |
| **Navegación** | `MatToolbar`, `MatSidenav`, `MatMenu`, `MatTabs`, `MatStepper` |
| **Layout** | `MatCard`, `MatList`, `MatGridList`, `MatDivider`, `MatExpansionPanel` |
| **Botones e indicadores** | `MatButton`, `MatIcon`, `MatBadge`, `MatChips`, `MatProgressBar`, `MatProgressSpinner` |
| **Ventanas emergentes** | `MatDialog`, `MatSnackBar`, `MatTooltip`, `MatBottomSheet` |
| **Datos** | `MatTable`, `MatPaginator`, `MatSort`, `MatTree` |

## Recursos útiles

- 📘 [Documentación oficial de Angular Material](https://material.angular.dev/)
- 🧩 [Catálogo de componentes](https://material.angular.dev/components/categories)
- 🛠️ [Angular CDK](https://material.angular.dev/cdk/categories)
- 🎨 [Material Design 3](https://m3.material.io/)
- 💻 [Repositorio en GitHub](https://github.com/angular/components)
- 🔤 [Material Icons](https://fonts.google.com/icons)

---

⭐ Si te ha resultado útil esta guía, ¡no olvides darle una estrella al repositorio!
