# Ejemplo 1: Servidor Web Estático con NGINX

## ¿Para qué sirve?
Muestra cómo empaquetar un sitio web HTML estático dentro de una imagen ligera basada en NGINX Alpine.

## Conceptos Clave
- `FROM`: Define la imagen base.
- `COPY`: Copia archivos locales dentro de la imagen.
- `EXPOSE`: Documenta el puerto en el que escucha el servicio.
- `CMD`: Define el proceso principal del contenedor.

## Instrucciones de Uso
1. Construir la imagen:
   ```bash
   docker build -t mi-web-estatica:v1 .
2. Correr contenedor:
   ```bash
   docker run -d -p 8080:80 --name servidor-web mi-web-estatica:v1
3. Acceder en el navegador a http://localhost:8080