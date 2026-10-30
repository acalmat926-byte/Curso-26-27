# Ejemplo 6: Despliegue de WordPress + MariaDB

## ¿Para qué sirve?
Ilustra el despliegue de una pila web clásica de dos capas utilizando imágenes oficiales de Docker Hub.

## Conceptos Clave
- `depends_on`: Garantiza que el contenedor de la base de datos se inicie antes que la aplicación WordPress.
- **Resolución DNS Interna:** WordPress localiza a la base de datos mediante el nombre del servicio (`db:3306`) en lugar de una dirección IP.

## Instrucciones de Uso
1. Desplegar los servicios:
   ```bash
   docker compose up -d

2. Abrir http://localhost:8000 para iniciar el asistente de instalación de WordPress.