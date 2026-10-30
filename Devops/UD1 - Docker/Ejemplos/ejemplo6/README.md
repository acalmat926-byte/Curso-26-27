# Ejemplo 6: API Microservicios con Redis y Healthchecks

## ¿Para qué sirve?
Asegura que el servicio de la API no se inicie hasta que la base de datos/caché Redis esté completamente operativa y responda a comprobaciones de estado (*healthchecks*).

## Conceptos Clave
- `healthcheck`: Ejecuta comandos periódicos dentro del contenedor para evaluar su estado real de salud.
- `depends_on -> condition: service_healthy`: Detiene la ejecución del contenedor dependiente hasta que el servicio previo pase el test de salud satisfactoriamente.

## Instrucciones de Uso
1. Iniciar el stack observando el proceso de comprobación de salud:
   ```bash
   docker compose up

2. Comprobar el estado de salud de los servicios[cite: 31]:

   ```bash
   docker compose ps

3. Acceso a FastApi
http://localhost:8000/