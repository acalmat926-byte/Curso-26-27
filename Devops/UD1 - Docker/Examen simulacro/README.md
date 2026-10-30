# Simulacro de examen - Docker

Creamos la red `examen_net` que usaremos en el resto del examen:

```bash
docker network create examen_net
```

## Parte 1

### 1. Creación de documentos

- /Dockerfile
- /index.php

### 2. Crear imagen

```bash
docker build . -t phpserver
```

### 3. Ejecutar contenedor para probar

```bash
docker run -p 8080:80 --network examen_net --name prueba phpserver
```

Se verá el error porque no están introducidos los parámetros, pero más adelante se añaden.

## Parte 3 y Parte 4

### 1. Creación de documentos

- /docker-compose.yml

### 2. Levantar docker compose

```bash
docker-compose up -d
```