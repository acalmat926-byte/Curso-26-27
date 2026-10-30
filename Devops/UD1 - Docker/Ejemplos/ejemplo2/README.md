# Ejemplo 2: Aplicación CLI en Python con Variables

## ¿Para qué sirve?
Demuestra el uso de variables en tiempo de construcción (`ARG`) y variables de entorno en tiempo de ejecución (`ENV`) dentro del contenedor.

## Conceptos Clave
- `WORKDIR`: Establece el directorio de trabajo activo para comandos posteriores.
- `ARG` vs `ENV`: `ARG` se usa durante la construcción (`docker build`) y `ENV` se mantiene durante la ejecución del contenedor.

## Instrucciones de Uso
1. Construir pasando un valor personalizado para el argumento APP_VERSION: 

   ```bash
   docker build --build-arg APP_VERSION=2.0.0 -t python-cli:v2 .

2. Ejecutar el contenedor, se ejecuta app.py y el contenedor se para:
   ```bash
   docker run --rm python-cli:v2
