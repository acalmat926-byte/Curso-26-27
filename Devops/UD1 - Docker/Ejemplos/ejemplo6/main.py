import os
from fastapi import FastAPI
import redis

app = FastAPI(title="Ejemplo 6 - API Microservicios")

# Se lee la variable REDIS_HOST inyectada en docker-compose.yml (por defecto 'redis')
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")

# Conexión al servicio Redis
cache = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)


@app.get("/")
def read_root():
    # Incrementar un contador de visitas almacenado en Redis
    visitas = cache.incr("contador_visitas")
    return {
        "mensaje": "Conexión exitosa entre FastAPI y Redis",
        "visitas_totales": visitas,
    }


@app.get("/health")
def health_check():
    # Comprobar la salud de la conexión con Redis
    redis_ok = cache.ping()
    return {"status": "ok", "redis_connected": redis_ok}