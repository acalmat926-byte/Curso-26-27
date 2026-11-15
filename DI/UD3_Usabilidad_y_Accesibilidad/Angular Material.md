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

- Es la librería oficial de componentes de interfaz de usuario (UI) para Angular
- Mantenida por el equipo de Angular.
- Implementa los principios de **[Material Design](https://m3.material.io/)**, el sistema de diseño de Google,
-  <ins>Tiene ya construidos, accesibles y listos para usar</ins>.
- Además, es posible usar el **CDK (Component Dev Kit)**, un conjunto de herramientas de bajo nivel para construir tus propios componentes.

## ¿Para qué sirve?

- 🎨 **Interfaces consistentes y modernas** sin tener que escribir todo el CSS desde cero.
- ⚡ **Desarrollo más rápido**: botones, formularios, tablas, diálogos, menús, etc. ya listos.
- ♿ **Accesibilidad **: los componentes siguen buenas prácticas de accesibilidad (ARIA, navegación por teclado).
- 📱 **Diseño responsive**: componentes que se adaptan a distintos tamaños de pantalla.
- 🎛️ **Temas personalizables**: puedes adaptar colores y tipografía a tu marca.
- ✅ **Soporte oficial**: se actualiza junto con cada versión de Angular.


## Instalación


```bash
ng add @angular/material
```

Durante la instalación, el CLI te preguntará:

1. **Tema** a usar (puedes elegir uno predefinido o uno personalizado).

Este comando se encarga automáticamente de:

- Instalar `@angular/material` y `@angular/cdk`.
- Añadir el tema a los estilos globales (`styles.scss` / `angular.json`).
- Incluir la fuente **Roboto**(fuente por defecto) y los **Material Icons** en `index.html`.


## Ejemplos de uso

Proyecto de ejemplo: [ProyectoAngularMaterial](./ProyectoAngularMaterial/).

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
- 🔤 [Material Icons](https://fonts.google.com/icons)

---
