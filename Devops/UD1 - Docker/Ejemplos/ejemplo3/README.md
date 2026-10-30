# Ejemplo 3: Servidor NGINX con Docker Compose y Persistencia

## ¿Para qué sirve?
Despliega un servicio NGINX sin necesidad de escribir un Dockerfile personalizado, gestionando almacenamiento persistente mediante volúmenes.

## Conceptos Clave
- `ports`: Mapea `puerto_host:puerto_contenedor`.
- `volumes` (servicio):
  - `./sitio_web:...`: Bind mount en modo solo lectura (`ro`).
  - `nginx_logs:...`: Volumen gestionado por Docker.
- `volumes` (raíz): Declara volúmenes gestionados independientes del ciclo de vida del contenedor.

## Instrucciones de Uso
1. Iniciar el servicio en segundo plano:
   ```bash
   docker compose up -d

2. Acceder a http://localhost:8080/

- Verificar los volúmenes creados:   
   ```bash
   docker volume ls
- Detener y limpiar recursos:   
   ```bash
   docker compose down