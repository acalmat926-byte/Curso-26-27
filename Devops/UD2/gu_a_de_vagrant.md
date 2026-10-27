> **Autoría:** Alejandro Calvo Mateos

# UD2 - Gestión de Entornos Virtuales con Vagrant

## Vagrant: ¿Qué es y Para Qué Sirve?

- **Vagrant** es una herramienta de código abierto.
- Facilita la **creación y gestión de entornos de desarrollo virtualizados** y portables.
- Proporciona a los desarrolladores un entorno consistente y reproducible, eliminando el famoso problema *"funciona en mi máquina"*.
- Permite **configurar máquinas virtuales** con la misma configuración para todo el equipo de trabajo.
- Usa Vagrant si necesitas simular un servidor o sistema operativo completo.
- Se debe utilizar conjuntamente con un proveedor de máquinas virtuales (VirtualBox, Docker, Hyper-V, VMware). En nuestro caso lo usaremos con VirtualBox.

---

## Instalación

### 🔗[Instalación de Vagrant](https://developer.hashicorp.com/vagrant/install)

 `vagrant -v`

### 🔗[Instalación de VirtualBox](https://www.virtualbox.org/wiki/Downloads)


## Ayuda

🔗[Vagrant Documentación](https://developer.hashicorp.com/vagrant/docs)

- Ayuda en comandos
`vagrant -h`

## Boxes de Vagrant: La Base de Todo Entorno

### ¿Qué son las Boxes?

- Las boxes son **imágenes base empaquetadas** que contienen sistemas operativos preconfigurados.
- Funcionan como **plantillas reutilizables** para crear máquinas virtuales idénticas.
- El origen de las boxes es crucial para la seguridad: **utiliza siempre fuentes oficiales**.
  - 🔗 [HashiCorp Cloud Platform (HCP) - Vagrant Discover](https://portal.cloud.hashicorp.com/vagrant/discover)

### Gestión de Versiones y Comandos Útiles

- Vagrant permite **especificar versiones** exactas de boxes mediante el parámetro `:version` en el `Vagrantfile`, asegurando consistencia entre entornos.
- El comando `vagrant box update` mantiene las **boxes actualizadas** con los últimos parches de seguridad y mejoras del sistema operativo base.

| Comando | Descripción |
| :--- | :--- |
| `vagrant box list` | Listar las boxes instaladas en tu host |
| `vagrant box add hashicorp/bionic64` | Añadir una box al repositorio local |
| `vagrant box remove hashicorp/bionic64` | Eliminar una box del repositorio local |


---

## El Flujo de Trabajo Esencial de Vagrant

Vagrant proporciona un ciclo de vida completo para la **gestión de máquinas virtuales mediante comandos** simples y directos:

- `vagrant init`: Inicializa el proyecto creando el `Vagrantfile` con la configuración base.
 Añadiendo la imagen `vagrant init ubuntu/trusty`
- `vagrant up`: Levanta y aprovisiona la máquina virtual según la configuración definida.
- `vagrant ssh`: Conecta por SSH a la máquina virtual en ejecución.
- `vagrant provision`: Ejecuta los scripts de aprovisionamiento sin necesidad de reiniciar la VM.
- `vagrant halt`: Apaga limpiamente la máquina virtual.
- `vagrant destroy`: Elimina completamente la máquina virtual.

> **Nota:** Este flujo permite una gestión eficiente del ciclo de vida completo, desde la creación inicial hasta la destrucción del entorno, garantizando reproducibilidad en cada iteración.

---

### Ejemplo 1
```bash
mkdir Prueba1
mkdir Prueba2
cd Prueba1
vagrant init ubuntu/trusty64
# Arranca la máquina virtual - Podemos acceder a la máquina virtual
vagrant up
# Entramos en la máquina por ssh
vagrant ssh
#EJEMPLO 2
cd ../Prueba2
vagrant init ubuntu/trusty64
vagrant up
.........
vagrant destroy

```

> [!IMPORTANT] 
> **ACTIVIDAD 1**

## Recurso: Scripts de Aprovisionamiento

> [!TIP]
> **Aprovisionamiento automatizado:** Consulta el siguiente tutorial para profundizar en la automatización de la instalación de software al levantar la VM.
> 
> 🎥 [Ver vídeo tutorial en YouTube sobre Scripts de Aprovisionamiento](https://www.youtube.com/watch?v=aLYMcwsIcwk)

---

## Configuración de Redes en Vagrant

Vagrant ofrece tres modos de red principales, desde aislamiento completo hasta integración total con la red física:

### 1. NAT (Network Address Translation)
- **Propósito:** Acceso a Internet desde la VM.
- **Características:**
  - Configuración por defecto en Vagrant.
  - El host no puede acceder directamente a la VM a menos que se reenvíen puertos (*port forwarding*).
  - Ideal para desarrollo aislado con conectividad externa.

### 2. Private Network (Host-Only)
- **Propósito:** Comunicación host-VM y entre VMs.
- **Características:**
  - **Red privada** entre el host y las máquinas virtuales.
  - Asignación de **IPs estáticas o DHCP**.
  - **Sin acceso directo a Internet** desde la red privada.
  - Perfecto para clusters y arquitecturas multi-máquina.

### 3. Public Network (Bridged)
- **Propósito:** VM como dispositivo de red real.
- **Características:**
  - La VM aparece como **dispositivo físico en la red local**.
  - Obtiene una IP del router de la red física.
  - Accesible desde otros dispositivos de la red.
  - Útil para pruebas de producción y demostraciones.

🔗 *Más información sobre redes:* [Guía de configuración de redes en Vagrant](https://codigoelectronica.com/blog/configurar-redes-en-vagrant)

---

## Carpetas Sincronizadas (Synced Folders) en Vagrant

Las carpetas sincronizadas son fundamentales para el desarrollo, permitiendo compartir archivos entre tu máquina local (*host*) y la máquina virtual (*guest*) de forma bidireccional y eficiente.

### Configuración Básica
Sintaxis básica dentro del `Vagrantfile`:
```ruby
config.vm.synced_folder "ruta/local", "ruta/remota"
```
- `"ruta/local"`: Ubicación en tu sistema operativo host.
- `"ruta/remota"`: Ubicación dentro de la máquina virtual.

### Parámetro `type`
Especifica el proveedor de sincronización para optimizar el rendimiento:
- `virtualbox` *(predeterminado)*: Fácil configuración.
- `rsync`: Ideal para mejorar el rendimiento, especialmente en macOS.
- `nfs` / `smb`: Para entornos más complejos o I/O intensivo.

### Permisos y Opciones de Montaje
Controla cómo se montará la carpeta dentro de la VM:
- `owner` y `group`: Definen el usuario y grupo de la carpeta montada.
- `mount_options`: Permite añadir opciones de montaje específicas del sistema de archivos.

### Ejemplo de Configuración en Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  
  # Sincronización básica
  config.vm.synced_folder "./data", "/vagrant_data"

  # Sincronización con tipo rsync y opciones de propietario/grupo
  config.vm.synced_folder "./www", "/var/www/html", 
    type: "rsync", 
    owner: "www-data", 
    group: "www-data"
end
```

---

## Tipos de Synced Folders: Comparativa Técnica

| Tipo | Rendimiento | Compatibilidad | Caso de Uso Ideal |
| :--- | :--- | :--- | :--- |
| **VirtualBox** | Medio | Universal (por defecto) | Desarrollo general, configuración inicial |
| **rsync** | Alto | Linux, macOS, WSL | Proyectos con muchos archivos pequeños |
| **NFS** | Muy Alto | Linux, macOS | Aplicaciones con I/O intensivo |
| **SMB** | Medio-Alto | Windows, Linux, macOS | Entornos Windows corporativos |

- La elección del método de sincronización impacta directamente en la velocidad de desarrollo.
- **NFS** y **rsync** son preferibles en entornos Linux/macOS para máximo rendimiento, mientras que **SMB** es la mejor opción en ecosistemas Windows nativos.

---

## Gestión de Snapshots: Protección y Recuperación

Los snapshots de Vagrant permiten capturar el estado completo de una máquina virtual en un momento específico, facilitando la experimentación sin riesgo y la recuperación rápida ante problemas.

### Comandos de Snapshots

- `vagrant snapshot save <nombre>`: Captura el estado actual de la VM (disco, memoria y configuración).
- `vagrant snapshot list`: Muestra todos los snapshots disponibles con sus nombres.
- `vagrant snapshot restore <nombre>`: Revierte la VM al estado exacto del snapshot especificado.
- `vagrant snapshot delete <nombre>`: Elimina snapshots antiguos para liberar espacio en disco.

### Casos de Uso Prácticos

- **Antes de cambios críticos:** Crear un snapshot antes de actualizaciones mayores o modificaciones de configuración arriesgadas.
- **Estados de desarrollo:** Mantener snapshots de diferentes fases del proyecto para comparación o *rollback*.
- **Testing destructivo:** Experimentar con configuraciones avanzadas sin temor a romper el entorno de trabajo.
- **Demos y presentaciones:** Garantizar un estado limpio y funcional para demostraciones repetidas.