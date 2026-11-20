> **Autoría:** Alejandro Calvo Mateos

# UD2 - Gestión de Entornos Virtuales con Vagrant

## Índice

- [Vagrant: ¿Qué es y Para Qué Sirve?](#vagrant-qué-es-y-para-qué-sirve)
- [Instalación](#instalación)
  - [Instalación de Vagrant](#-instalación-de-vagrant)
  - [Instalación de VirtualBox](#-instalación-de-virtualbox)
- [Ayuda](#ayuda)
- [Boxes](#boxes)
  - [¿Qué son las Boxes?](#qué-son-las-boxes)
  - [Gestión de Versiones y Comandos Útiles](#gestión-de-versiones-y-comandos-útiles)
- [Vagrantfile](#vagrantfile)
  - [Estructura básica](#estructura-básica)
  - [Opciones más habituales](#opciones-más-habituales)
  - [Comandos útiles](#comandos-útiles)
- [El Flujo de Trabajo Esencial de Vagrant](#el-flujo-de-trabajo-esencial-de-vagrant)
  - [Ejemplo 1](#ejemplo-1)
- [Scripts de Aprovisionamiento](#scripts-de-aprovisionamiento)
  - [Herramientas de aprovisionamiento](#herramientas-de-aprovisionamiento)
  - [Aspectos a tener en cuenta para creación del aprovisionamiento](#aspectos-a-tener-en-cuenta-para-creación-del-aprovisionamiento)
  - [Ejemplos Prácticos de Configuración](#ejemplos-prácticos-de-configuración)
    - [Opción A: Script Inline (dentro del propio Vagrantfile)](#opción-a-script-inline-dentro-del-propio-vagrantfile)
    - [Opción B: Script en archivo externo `.sh`](#opción-b-script-en-archivo-externo-sh)
- [Recursos de la VM](#recursos-de-la-vm)
  - [Sintaxis con VirtualBox](#sintaxis-con-virtualbox)
  - [Opciones más habituales](#opciones-más-habituales)
  - [Aspectos a tener en cuenta](#aspectos-a-tener-en-cuenta)
  - [Comprobar que se ha aplicado](#comprobar-que-se-ha-aplicado)
- [Configuración de Redes en Vagrant](#configuración-de-redes-en-vagrant)
  - [1. NAT (Network Address Translation)](#1-nat-network-address-translation)
  - [2. Private Network (Host-Only)](#2-private-network-host-only)
  - [3. Public Network (Bridged)](#3-public-network-bridged)
- [Carpetas Sincronizadas (Synced Folders) en Vagrant](#carpetas-sincronizadas-synced-folders-en-vagrant)
  - [Configuración Básica](#configuración-básica)
  - [Parámetro `type`](#parámetro-type)
  - [Permisos y Opciones de Montaje](#permisos-y-opciones-de-montaje)
  - [Ejemplo de Configuración en Vagrantfile](#ejemplo-de-configuración-en-vagrantfile)
- [Tipos de Synced Folders: Comparativa Técnica](#tipos-de-synced-folders-comparativa-técnica)
- [Gestión de Snapshots: Protección y Recuperación](#gestión-de-snapshots-protección-y-recuperación)
  - [Comandos de Snapshots](#comandos-de-snapshots)
  - [Casos de Uso Prácticos](#casos-de-uso-prácticos)

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

## Boxes

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

---

## Vagrantfile

- El **Vagrantfile** es el archivo de configuración que describe **cómo debe ser la máquina virtual**: qué box usa, qué red tiene, qué carpetas comparte y qué software se instala.
- Se crea con `vagrant init` y vive en la **raíz de la carpeta del proyecto**. Cada proyecto tiene su propio Vagrantfile.
- Está escrito en **Ruby**, pero no hace falta saber Ruby: se usa como un lenguaje **declarativo**. Describimos *cómo queremos* la VM y Vagrant se encarga de crearla.
- Al ser un archivo de texto, se puede **versionar con Git** y compartir con el equipo. Esto es lo que garantiza entornos idénticos para todos.

### Estructura básica

```ruby
Vagrant.configure("2") do |config|
  # Aquí va toda la configuración de la VM
  config.vm.box = "ubuntu/jammy64"
end
```

- `Vagrant.configure("2")`: indica que se usa la **versión 2** del formato de configuración (la actual). Siempre se escribe igual.
- `do |config| ... end`: bloque dentro del cual se define la configuración. `config` es el objeto sobre el que vamos añadiendo opciones.
- Las líneas que empiezan por `#` son **comentarios**.

### Opciones más habituales

| Opción                                | Para qué sirve                          |
| ------------------------------------- | --------------------------------------- |
| `config.vm.box`                       | Box (imagen base) que se utilizará      |
| `config.vm.hostname`                  | Nombre de host de la VM                 |
| `config.vm.network`                   | Configuración de red                    |
| `config.vm.synced_folder`             | Carpetas compartidas host ↔ VM          |
| `config.vm.provision`                 | Scripts de aprovisionamiento            |
| `config.vm.provider`                  | Opciones del proveedor (RAM, CPUs...)   |

> **Nota:** Las secciones siguientes de esta guía (aprovisionamiento, redes y carpetas sincronizadas) consisten básicamente en añadir líneas dentro de este bloque.

### Comandos útiles

- `vagrant validate`: comprueba que el Vagrantfile no tiene errores de sintaxis.
- `vagrant reload`: reinicia la VM aplicando los cambios hechos en el Vagrantfile.

> **Importante:** Cualquier cambio en el Vagrantfile solo se aplica al **reiniciar la VM** (`vagrant reload`) o al crearla de nuevo; no se refleja en una máquina que ya está en marcha.

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

> [!IMPORTANT] 
> **ACTIVIDAD 2**

## Scripts de Aprovisionamiento

-> Cuando trabajamos con máquinas virtuales en desarrollo, no basta solo con crear la máquina 

-> Necesitamos que tenga instalado el software necesario (servidores web, bases de datos, lenguajes de programación, etc.). 

--> A este proceso de configuración automática lo llamamos **aprovisionamiento**.

* **¿Por qué se usa?** Evita tener que entrar por SSH a la máquina e instalar todo manualmente cada vez que creamos o destruimos el entorno.
* **Ventaja principal:** Si le pasas tu proyecto a un compañero de clase o de trabajo, ejecutando un solo comando tendrá exactamente la misma configuración que tú.

---

### Herramientas de aprovisionamiento 

Vagrant permite integrar distintas herramientas para aprovisionar sistemas:

* **Gestores avanzados:** Herramientas como *Ansible, Puppet, Chef* o *Docker* se usan en entornos profesionales complejos.
* **Shell Scripts (`.sh`):** Es la opción más sencilla, directa y rápida.

### Aspectos a tener en cuenta para creación del aprovisionamiento


- **Ejecución NO interactiva**

Como los scripts de aprovisionamiento se ejecutan en segundo plano, **ningún comando puede quedarse esperando a que un usuario pulse una tecla**.

**El problema:** Si instalas un paquete y el sistema te pregunta `¿Desea continuar? [S/n]`, el script se quedará congelado o fallará al no recibir respuesta.

**La solución:** Utilizar siempre modificadores o parámetros que respondan afirmativamente de forma automática.

*Ejemplo:* Usar `apt-get install -y nginx` en lugar de `apt-get install nginx`.

- **Permisos de superusuario**

En máquinas Linux, Vagrant ejecuta los scripts por defecto con permisos de `root`. **No hace falta escribir `sudo`** delante de los comandos 


### Ejemplos Prácticos de Configuración

Existen dos formas de incluir scripts de Shell en tu `Vagrantfile`:

#### Opción A: Script Inline (dentro del propio Vagrantfile)

Ideal para instalaciones muy cortas (de 2 o 3 líneas). 

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  # Definimos el bloque de comandos Bash inline
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y apache2
  SHELL

end
```

Ejecución de ejemplo 

1. Creación de carpeta para máquina virtual `mkdir p1`
2. Acceder en la carpeta `cd p1`
3. Iniciar máquina virtual `vagrant init`
4. Modificamos el archivo Vagrantfile con el contenido de arriba
5. Arrancamos la máquina virtual `vagrant up`
6. Entramos en la máquina virtual por ssh `vagrant ssh`
7. Dentro de la MV para comprobar que se instaló apache `curl localhost`


#### Opción B: Script en archivo externo `.sh`

Es la opción recomendada cuando la instalación empieza a crecer y queremos mantener un código limpio y organizado.

1. Creas el archivo del script con el nombre y contenido que deseamos en la misma carpeta del proyecto:

Por ejemplo:
   ```bash
    apt-get update
    apt-get install -y apache2
    echo "<h1>Hola desde Vagrant</h1>" > /var/www/html/index.html
   ```

2. Apuntas al archivo desde el `Vagrantfile` mediante el parámetro `path`:
   ```ruby
   Vagrant.configure("2") do |config|
     config.vm.box = "ubuntu/trusty64"

     # Enlazamos la ruta del script externo
     config.vm.provision "shell", path: "php.sh"
   end
   ```

 **¿Cuándo se ejecuta la provisión?** 
   * Se ejecuta únicamente **la primera vez** que lanzas el comando `vagrant up`.
   * Si apagas la máquina y la vuelves a encender, el script **no** se volverá a ejecutar para no duplicar procesos.
  
**Forzar la reejecución:**

Si modificas el script y quieres aplicar los cambios en una máquina ya existente, debes ejecutar:
    
```bash
vagrant provision
```

O bien reiniciar aplicando el flag de aprovisionamiento:
```bash
vagrant up --provision
```


---

> [!IMPORTANT] 
> **ACTIVIDAD 3**
---

## Recursos de la VM

- Por defecto, Vagrant crea máquinas virtuales con **recursos mínimos** (normalmente 1 GB de RAM y 1 CPU), que pueden quedarse cortos para bases de datos, servidores de aplicaciones, etc.
- Los recursos de hardware **no los gestiona Vagrant, sino el proveedor** (VirtualBox, VMware, Hyper-V...). Por eso se configuran dentro de un bloque específico del proveedor.

### Sintaxis con VirtualBox

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.provider "virtualbox" do |vb|
    vb.name   = "mi-vm"
    vb.memory = 2048
    vb.cpus   = 2
  end
end
```

### Opciones más habituales

| Opción        | Descripción                                                    | Ejemplo               |
| ------------- | -------------------------------------------------------------- | --------------------- |
| `vb.name`     | Nombre de la VM **en VirtualBox** (el que ves en su interfaz)  | `vb.name = "mi-vm"`   |
| `vb.memory`   | Memoria RAM asignada, **en MB**                                | `vb.memory = 2048`    |
| `vb.cpus`     | Número de núcleos de CPU                                       | `vb.cpus = 2`         |
| `vb.gui`      | Muestra la ventana gráfica de VirtualBox al arrancar           | `vb.gui = true`       |

### Aspectos a tener en cuenta

- **`vb.name` no es lo mismo que `config.vm.hostname`.** El primero es el nombre de la VM en VirtualBox; el segundo es el nombre de host *dentro* del sistema operativo de la VM.
- **Los nombres deben ser únicos.** Si dos proyectos usan el mismo `vb.name`, pueden producirse conflictos en VirtualBox.
- **No asignes más recursos de los que tiene tu equipo.** Como regla general, no superes la mitad de la RAM y de los núcleos de tu máquina física, sobre todo si vas a levantar varias VMs a la vez.
- **La sintaxis depende del proveedor.** Si usas otro proveedor, el bloque cambia (por ejemplo, `config.vm.provider "vmware_desktop"` o `"hyperv"`), igual que algunas opciones.

### Comprobar que se ha aplicado

Una vez arrancada la VM, entra por SSH y verifica los recursos:

```bash
vagrant ssh
nproc      # Número de CPUs
free -h    # Memoria RAM disponible
```

> **Importante:** Los cambios de recursos solo se aplican al **reiniciar la VM** con `vagrant reload` (o al crearla de nuevo con `vagrant up`). No se actualizan con la máquina en marcha ni con `vagrant provision`.

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

> [!IMPORTANT] 
> **ACTIVIDAD 3**

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

> [!IMPORTANT] 
> **ACTIVIDAD 4**

> [!IMPORTANT] 
> **ACTIVIDAD 5**