# Estándares de usabilidad y accesibilidad en interfaces web

## 1. Conceptos básicos

| Concepto | ¿Qué es? | Pregunta que responde |
|---|---|---|
| **Usabilidad** | Facilidad con la que una persona usa una interfaz para lograr un objetivo de forma eficaz, eficiente y satisfactoria. | ¿Es fácil, rápida y agradable de usar? |
| **Accesibilidad** | Posibilidad de que **todas las personas**, con o sin discapacidad, puedan percibir, entender, navegar e interactuar con la web. | ¿Puede usarla cualquiera, con cualquier dispositivo o capacidad? |
| **Estándar** | Norma o recomendación acordada por organismos reconocidos para hacer las cosas de forma común y coherente. | ¿Qué reglas seguimos todos? |

> La accesibilidad no es solo para personas con discapacidad: también ayuda a personas mayores, a quien usa el móvil al sol, a quien tiene una conexión lenta o una lesión temporal en la mano.

---

## 2. Principales estándares identificados

### 2.2. Usabilidad

#### ISO 9241 – Ergonomía de la interacción persona-sistema
Familia de normas internacionales. Las más relevantes:

- **ISO 9241-11**: define la usabilidad mediante tres atributos: **eficacia**, **eficiencia** y **satisfacción**.
- **ISO 9241-110**: principios de diálogo (adecuación a la tarea, autodescripción, control por el usuario, conformidad con las expectativas, tolerancia a errores, adecuación a la individualización y al aprendizaje).
- **ISO 9241-210**: diseño centrado en las personas usuarias.
- **ISO 9241-171**: guía de accesibilidad del software.


#### Heurísticas de Nielsen (referencia, no norma oficial)

🔗 [Abrir PDF: 10 reglas heurísticas de Nielsen y cómo aplicarlas](<10 reglas heurísticas de Nielsen y cómo aplicarlas.pdf>)


#### Norma de usabilidad en sitios web Junta de Andalucía

🔗 [Norma de usabilidad en sitios web - Junta de Andalucía](https://desarrollo.juntadeandalucia.es/recursos/reglas-pautas/norma-usabilidad-en-sitios-web)


### 2.2. Accesibilidad

#### WCAG (Web Content Accessibility Guidelines) – W3C
Es **el estándar de referencia mundial** de accesibilidad web. Las versiones más usadas son la 2.1 y la 2.2 (la 2.0 es además norma ISO/IEC 40500).

#### 4 principios POUR

🔗 [Abrir PDF: Los cuatro principios perceptible, operable, comprensible y robusto](<Los cuatro principios perceptible, operable, comprensible y robusto.pdf>)

#### Normativa legal y técnica
| Norma | Ámbito | Resumen |
|---|---|---|
| **UNE-EN 301 549** | Europa / España | Requisitos de accesibilidad de productos y servicios TIC. Incorpora WCAG 2.1 nivel AA. |
| **Directiva (UE) 2016/2102** y **Real Decreto 1112/2018** | Sector público (España) | Obligan a que webs y apps públicas sean accesibles. |
| **Acta Europea de Accesibilidad (Directiva 2019/882)** | Sector privado (UE) | Exige accesibilidad en comercio electrónico, banca, transporte, etc. |
| **UNE 139803** | España | Norma anterior basada en WCAG, hoy sustituida por la UNE-EN 301 549. |

---


## 3. Importancia de usar estándares en la creación de interfaces

### 3.1. Ventajas principales

| Ventaja | Explicación |
|---|---|
| **Inclusión** | Más personas pueden usar el producto, incluidas las que tienen discapacidades. |
| **Coherencia** | Las interfaces se comportan de forma parecida, así se aprenden más rápido (menos curva de aprendizaje). |
| **Compatibilidad** | Funciona en distintos navegadores, dispositivos y tecnologías de apoyo. |
| **Cumplimiento legal** | Evita sanciones y reclamaciones al cumplir la normativa vigente. |
| **Mantenimiento** | Un código estándar es más fácil de entender, actualizar y reutilizar por otros equipos. |
| **SEO y rendimiento** | El HTML semántico y bien estructurado mejora el posicionamiento en buscadores. |
| **Calidad y reputación** | Mejora la experiencia, la satisfacción y la confianza en la marca. |
| **Ahorro de costes** | Corregir problemas en el diseño inicial es mucho más barato que hacerlo una vez publicado. |
| **Menos errores** | Los usuarios se equivocan menos si la interfaz es predecible. |


### 3.3. Ejemplo comparativo

| Sin estándares | Con estándares |
|---|---|
| Botón hecho con un `<div>` sin función de teclado. | `<button>` nativo: funciona con ratón, teclado y lector de pantalla. |
| Texto gris claro sobre fondo blanco. | Contraste mínimo 4,5:1 (WCAG AA). |
| Imagen sin descripción. | `<img alt="Gráfico de ventas de 2025">` |
| Error: «Campo inválido». | Error: «El correo debe incluir @, por ejemplo nombre@correo.com». |
| Enlace que dice «Pincha aquí». | Enlace que dice «Descargar la guía de matrícula (PDF)». |

---


## 5. Herramientas útiles para verificar

| Herramienta | Para qué sirve |
|---|---|
| **WAVE** | Detecta errores de accesibilidad visualmente. |
| **Lighthouse** (Chrome DevTools) | Auditoría de accesibilidad, rendimiento y SEO. |
| **axe DevTools** | Análisis automático de accesibilidad. |
| **W3C Markup Validator** | Valida el HTML. |
| **Contrast Checker** | Comprueba el contraste de colores. |
| **NVDA / VoiceOver** | Lectores de pantalla para pruebas reales. |

> Las herramientas automáticas detectan solo una parte de los problemas; conviene complementarlas con pruebas manuales y con personas usuarias reales.

---