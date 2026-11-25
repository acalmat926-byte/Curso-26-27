docker compose up -d
docker compose logs -f zabbix-server

Arrancar
bash
docker compose up -d
docker compose logs -f zabbix-server

La primera vez tarda uno o dos minutos porque crea la base de datos. Cuando veas que el servidor arranca sin errores, ya está.

5. Acceder

Abre http://IP_DE_TU_SERVIDOR:8080

Usuario: Admin
Contraseña: zabbix

Cambia la contraseña de Admin en el primer acceso (Usuarios → Usuarios → Admin).

6. Comprobar el agente local

Si en Datos → Hosts el host "Zabbix server" aparece con el icono ZBX en rojo, entra en su configuración y cambia la interfaz del agente para que use DNS con el nombre zabbix-agent (puerto 10050) en lugar de la IP 127.0.0.1.

Comandos útiles
bash
docker compose ps          # estado
docker compose down        # parar
docker compose pull && docker compose up -d   # actualizar dentro de la misma versión