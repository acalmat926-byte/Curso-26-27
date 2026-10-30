# Ejemplo 5: Segmentación y Aislamiento con Redes Docker

## ¿Para qué sirve?
Muestra cómo estructurar una red corporativa segura donde la base de datos no es accesible desde la red pública/frontend.

## Conceptos Clave
- `frontend_net`: Conecta el servidor Web NGINX con el Backend Node.js.
- `backend_net`: Conecta el Backend con la Base de Datos PostgreSQL.
- **Seguridad:** El servicio `database` no tiene acceso a `frontend_net` ni expone puertos al exterior, impidiendo conexiones no autorizadas fuera del contenedor `backend`.


## Instrucciones de Uso
1. Iniciar la infraestructura:   
   ```bash
   docker compose up -d

2. Inspeccionar la configuración de las redes creadas:   
   ```bash
   docker network inspect <nombre_proyecto>_backend_net


## Acceso desde el Host o Navegador (Acceso Externo)
- Frontend: Es el único servicio accesible desde el exterior porque declara el mapeo de puertos 80:80. Se accede desde el navegador o mediante comandos HTTP en:
http://localhost

- Backend: No define la directiva ports, por lo que no es posible acceder directamente mediante http://localhost:<puerto> desde el navegador de la máquina anfitriona. 

- Database (PostgreSQL): Tampoco expone puertos al exterior, impidiendo cualquier intento de conexión directa desde fuera del entorno de Docker para garantizar la seguridad de los datos.

## Comunicación entre Contenedores (Acceso Interno)
Las redes bridge personalizadas incluyen un servicio de resolución DNS integrado que permite a los contenedores localizarse utilizando el nombre del servicio o el nombre del contenedor como hostname:   

- Frontend → Backend: Ambos están conectados a la red frontend_net. El contenedor frontend (o un proxy en él) puede enviar peticiones al backend usando el nombre de host backend o network_backend.   

- Backend → Database: Ambos comparten la red backend_net. El backend de Node.js conecta a PostgreSQL utilizando el nombre de host database (o network_db) en el puerto por defecto 5432:postgres://postgres:secret_db_pass@database:5432/nombre_bd   

- Frontend → Database: La conexión directa está bloqueada por diseño al no compartir ninguna red (frontend_net y backend_net están completamente aisladas).   

## Acceso Administrativo por Consola (Pruebas y Gestión)
Para ejecutar comandos de depuración o interactuar directamente con los servicios en ejecución:   

- Conectarse a la terminal del contenedor Backend:   
   ```bash
   docker exec -it network_backend sh

- Acceder a la consola de la Base de Datos (psql):   
   ```bash
   docker exec -it network_db psql -U postgres

- Comprobar la resolución DNS interna desde el Backend hacia la Base de Datos:   
   ```bash
   docker exec0 -it network_backend ping database