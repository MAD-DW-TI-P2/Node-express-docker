# Node-express-docker

## Requisitos

- Docker desktop: https://www.docker.com/products/docker-desktop/. Es como Sourcetree
- Docker cli en Mac: https://formulae.brew.sh/formula/docker (En Windows se instala con la app). Es como git.
- Docker hub: https://hub.docker.com/ (Crearse cuenta, la misma que la de escritorio). Es como Github.
- Node: https://nodejs.org/en/download

## Intro a Docker

<img src="https://jorgebenitezlopez.com/tiddlywiki/pro/docker-visual.png" style="border:1px solid grey">

- Un __Dockerfile__ es un archivo de texto plano que contiene una serie de instrucciones que le dicen a Docker cómo construir una imagen de contenedor. Docker utiliza este archivo para automatizar el proceso de creación de imágenes

- Una __imagen__ en Docker es básicamente una plantilla o receta que contiene todo lo necesario para iniciar y ejecutar un contenedor. Esto incluye el sistema operativo base, el software que se ejecutará, las bibliotecas necesarias, los archivos de configuración, las variables de entorno, y otros componentes. La analogía con un "snapshot de una máquina virtual" es útil porque, al igual que un snapshot captura el estado completo de una máquina virtual en un punto específico en el tiempo, una imagen de Docker captura todo lo necesario para iniciar un proceso (o conjunto de procesos) en un estado determinado. Sin embargo, las imágenes de Docker son "mucho más ligeras" que los snapshots de máquinas virtuales por varias razones Contenedor. 

- Un __contenedor__ es una instancia en ejecución de una imagen. Cuando inicias un contenedor a partir de una imagen, Docker toma la "plantilla" que la imagen proporciona y la usa para crear un entorno aislado y ejecutable donde tu aplicación puede correr. Esto es similar a "restaurar una máquina virtual a partir de un snapshot",

## Necesitamos un proyecto para generar la imagen y luego los contenedores.

- A modo de ejemplo vamos a generar una imagen con un back realizado con express para hacer un CRUD de tareas. Es recomendable que la base de datos no esté en local. Ejemplo en https://www.mongodb.com/
- Para ello puedes utilizar la carpeta register-1 con un node con un CRUD de registro de usuarios. Solo tendrías que generar el .env con las variables personalizadas del .env.example
- En el proyecto ejecuto docker init y pongo lo siguiente
```
? What application platform does your project use? Node
? What version of Node do you want to use? 21.6.2
? Which package manager do you want to use? npm
? What command do you want to use to start the app? node index.js
? What port does your server listen on? 8081
```

- Me genera:

```
.dockerignore
Dockerfile
compose.yaml
README.Docker.md
```
