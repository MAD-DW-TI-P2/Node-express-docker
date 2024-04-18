# Node-express-docker

- ¿Para qué sirve Docker? https://app.sli.do/event/mPKeWYdt9xkRkCoYrGYbkn
- Docker es una plataforma de contenedores que facilita la creación, el despliegue y la ejecución de aplicaciones de manera consistente y portátil en cualquier entorno. Permite empacar una aplicación y todas sus dependencias en un contenedor estandarizado, lo que garantiza que la aplicación se ejecute de la misma manera en cualquier lugar donde se ejecute Docker. __Mantener en tu ordenador un entorno de ejecución compatible con el poryecto, tener un entorno compartido y sobre todo desplegar en producción sin preocuparte mucho de la la configuración/lenguajes del servidor.__

## Requisitos

- Docker desktop: https://www.docker.com/products/docker-desktop/. Es como Sourcetree
- Docker cli en Mac: https://formulae.brew.sh/formula/docker (En Windows se instala con la app). Es como git.
- Docker hub: https://hub.docker.com/ (Crearse cuenta, la misma que la de escritorio). Es como Github.
- Node: https://nodejs.org/en/download

## Intro a Docker

<img src="https://jorgebenitezlopez.com/tiddlywiki/pro/docker-visual.png" style="border:1px solid grey">

- Un __Dockerfile__ es un archivo de texto plano que contiene una serie de instrucciones que le dicen a Docker cómo construir una imagen de contenedor. Docker utiliza este archivo para automatizar el proceso de creación de imágenes

- Una __imagen__ en Docker es básicamente una plantilla o receta que contiene todo lo necesario para iniciar y ejecutar un contenedor. Esto incluye el sistema operativo base, el software que se ejecutará, las bibliotecas necesarias, los archivos de configuración, las variables de entorno, y otros componentes. La analogía con un "snapshot de una máquina virtual" es útil porque, al igual que un snapshot captura el estado completo de una máquina virtual en un punto específico en el tiempo, una imagen de Docker captura todo lo necesario para iniciar un proceso (o conjunto de procesos) en un estado determinado. Sin embargo, las imágenes de Docker son "mucho más ligeras" que los snapshots de máquinas virtuales por varias razones. 

- Un __contenedor__ es una instancia en ejecución de una imagen. Cuando inicias un contenedor a partir de una imagen, Docker toma la "plantilla" que la imagen proporciona y la usa para crear un entorno aislado y ejecutable donde tu aplicación puede correr. Esto es similar a "restaurar una máquina virtual a partir de un snapshot",

## Necesitamos un proyecto para generar la imagen y luego los contenedores de docker.

- A modo de ejemplo vamos a generar una imagen con un back realizado con express para hacer un registro y login de usuarios. Es recomendable que la base de datos no esté en local. Ejemplo en [https://www.mongodb.com/](https://www.mongodb.com/atlas/database)
- Para ello puedes utilizar la carpeta register-1 con un node. Solo tendrías que generar el .env con las variables personalizadas del .env.example

## Una vez que tenemos el proyecto funcionando (Hacemos una llamada por POST enviando datos de un usuario), generamos su imagen

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
- Una vez generado el archivo (Dokerfile) ya podríamos crear la imagen y el contenedor con el siguiente comando: docker compose up --build . Puedes probar pero da error... El docker compose es un comando que define servicios y los iniciarías juntos con un solo comando.
- Para solucionar este error tenemos varias opciones, ¿Cuál es la más segura?:
  - Vamos a editar el compose.yaml para que la imagen acceda a las variables de entorno. Puedes ver que está comentado en el compose de register-2 
  - También podría poner una referencia al .env en el compose. Puedes ver que está comentado en el compose de register-2 
  - Más avanzado: Docker Secret es una característica de Docker que ayuda a gestionar y almacenar de forma segura información confidencial, como contraseñas, tokens de acceso y claves privadas. Está diseñado principalmente para ser utilizado con Docker Swarm. O también herramientas de gestión de secretos: Herramientas como HashiCorp Vault, AWS Secrets Manager o Azure Key
- Levantas el contenedor y verifico que funciona el servicio. Con Postman o una herrmienta similar. Parece lo mismo pero a donde haces la llamada ahora es a un contenedor
- <img src="https://jorgebenitezlopez.com/github/postman-docker.png" style="border:1px solid grey">
- También puedes comprobar cómo has creado un contenedor y una imagen en la app de Docker
- <img src="https://jorgebenitezlopez.com/github/docker-container.png" style="border:1px solid grey">

