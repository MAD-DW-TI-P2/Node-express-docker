<kbd><img src="https://jorgebenitezlopez.com/github/docker-facebook.png" style="border:1px solid grey"></kbd>

# Introducción a Docker 😀

- ¿Para qué sirve Docker? https://app.sli.do/event/mPKeWYdt9xkRkCoYrGYbkn
- Docker es una plataforma de contenedores que facilita la creación, el despliegue y la ejecución de aplicaciones de manera consistente y portátil en cualquier entorno. Permite empacar una aplicación y todas sus dependencias en un contenedor estandarizado, lo que garantiza que la aplicación se ejecute de la misma manera en cualquier lugar donde se ejecute Docker. __Mantener en tu ordenador un entorno de ejecución compatible con el poryecto, tener un entorno compartido y sobre todo desplegar en producción sin preocuparte mucho de la la configuración/lenguajes del servidor.__

## Requisitos 👍🏽

- Docker desktop: https://www.docker.com/products/docker-desktop/. Es como Sourcetree
- Docker cli en Mac: https://formulae.brew.sh/formula/docker (En Windows se instala con la app). Es como git.
- Docker hub: https://hub.docker.com/ (Crearse cuenta, la misma que la de escritorio). Es como Github.
- Node: https://nodejs.org/en/download

## Primeros pasos 🧘🏼‍♂️

<kbd><img src="https://jorgebenitezlopez.com/tiddlywiki/pro/docker-visual.png" style="border:1px solid grey"></kbd>

- Un __Dockerfile__ es un archivo de texto plano que contiene una serie de instrucciones que le dicen a Docker cómo construir una imagen de contenedor. Docker utiliza este archivo para automatizar el proceso de creación de imágenes

- Una __imagen__ en Docker es básicamente una plantilla o receta que contiene todo lo necesario para iniciar y ejecutar un contenedor. Esto incluye el sistema operativo base, el software que se ejecutará, las bibliotecas necesarias, los archivos de configuración, las variables de entorno, y otros componentes. La analogía con un "snapshot de una máquina virtual" es útil porque, al igual que un snapshot captura el estado completo de una máquina virtual en un punto específico en el tiempo, una imagen de Docker captura todo lo necesario para iniciar un proceso (o conjunto de procesos) en un estado determinado. Sin embargo, las imágenes de Docker son "mucho más ligeras" que los snapshots de máquinas virtuales por varias razones. 

- Un __contenedor__ es una instancia en ejecución de una imagen. Cuando inicias un contenedor a partir de una imagen, Docker toma la "plantilla" que la imagen proporciona y la usa para crear un entorno aislado y ejecutable donde tu aplicación puede correr. Esto es similar a "restaurar una máquina virtual a partir de un snapshot",

## Necesitamos un proyecto para generar la imagen y luego el contenedor ⭐️

- A modo de ejemplo vamos a generar una imagen con un back realizado con express para hacer un registro y login de usuarios. Es recomendable que la base de datos no esté en local. Ejemplo en [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)
- Para ello puedes utilizar la carpeta register-1 con un node. Solo tendrías que generar el .env con las variables personalizadas del .env.example
- Levantas el servico y hacen una petición para comprobar que todo ok
<kbd><img src="https://jorgebenitezlopez.com/github/postman-docker.png" style="border:1px solid grey"></kbd>
- Cerramos el servidor para montarlo en un contenedor de Docker

## Iniciamos Docker en el proyecto 🤖

- En el proyecto ejecuto docker init y pongo lo siguiente (Me reconoce algunas)
```
? What application platform does your project use? Node
? What version of Node do you want to use? 21.6.2
? Which package manager do you want to use? npm
? What command do you want to use to start the app? node index.js
? What port does your server listen on? 8081
```

- Me genera:

```
.dockerignore // Como el gitignore
Dockerfile // Las instrucciones para levantar la app
compose.yaml // Una archivo para componer contenedores 
README.Docker.md // Info sobre cómo levantar Docker
```
- Una vez generado el archivo (Dokerfile) ya podríamos crear la imagen y el contenedor con el siguiente comando: docker compose up --build . Puedes probar pero da error... El docker compose es un comando que define servicios y los iniciarías juntos con un solo comando.
- Para solucionar este error tenemos varias opciones, ¿Cuál es la más segura?:
  - Vamos a editar el compose.yaml para que la imagen acceda a las variables de entorno. Puedes ver que está comentado en el compose de register-2 
  - También podría poner una referencia al .env en el compose. Puedes ver que está comentado en el compose de register-2 
  - Más avanzado: Docker Secret es una característica de Docker que ayuda a gestionar y almacenar de forma segura información confidencial, como contraseñas, tokens de acceso y claves privadas. Está diseñado principalmente para ser utilizado con Docker Swarm. O también herramientas de gestión de secretos: Herramientas como HashiCorp Vault, AWS Secrets Manager o Azure Key
- Levantas el contenedor y verifico que funciona el servicio. Con Postman o una herramienta similar. Parece lo mismo pero a donde haces la llamada ahora es a un contenedor
<kbd><img src="https://jorgebenitezlopez.com/github/postman-docker.png" style="border:1px solid grey"></kbd>
- También puedes comprobar cómo has creado un contenedor y una imagen en la app de Docker
<kbd><img src="https://jorgebenitezlopez.com/github/docker-container.png" style="border:1px solid grey"></kbd>

## Vamos a construir la imagen "manualmente" para subirla a Docker hub 🚀

- Contruyes la imagen esta vez con: `docker build -t register-2 .`Tiene que devolver algo así: View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/l1v9l1w537y5xcml5zgyb3f3k
- Puedes verificar con `docker images` Tiene que aparecer la imagen que has creado.
- Para subir esta imagen a docker hub hay que etiquetar tu imagen con tu nombre de usuario. Ejemplo: `docker tag register-2:latest signados/register-2:latest`
- Puedes levantar un contenedor manualmente de esa imagen con el siguiente comando: `docker run -e NODE_ENV='production' -e TOKEN_SECRET='XXXXXX' -e MONGODB_URI='mongodb+srv://XXXXXX:XXXXXXXX@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' -e PORT_CONNECTION='8081' -p 8081:8081 signados/register-2:latest` y de nuevo verificar que todo funciona.
- Ejecutar este comando para verificar que estamos logados: `docker login`
- Subir: `docker push signados/register-2:latest`
- Verificamos que la imagen se ha subido
<kbd><img src="https://jorgebenitezlopez.com/github/dockerhub.png" style="border:1px solid grey"></kbd>
- Podriamos desplegar esta imagen pero no es compatible con algunas plataformas (5 horas investigando...) Mejor utilizar el siguiente comando. Se trata de una mejora del comando docker build, proporcionando más características y opciones para la creación de imágenes. Su funcionalidad principal es permitir la construcción de imágenes Docker para múltiples plataformas de hardware desde una única máquina. Verificamos que el register-3 están en Docker Hub.
```
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t signados/register-3:latest \
  --push .
```

## Empieza lo bueno 🔥

- Hasta aquí la intro a Docker ahora a desplegarlo en producción: Dominio/Subdominio, DNS, hosting, certificado, subir la imagen, montar un contenedor y crear un proxy inverso (un proxy inverso actúa como intermediario para los servidores con respecto a las solicitudes procedentes de los clientes)
- Dominio o subdominio. Es la dirección de nuestro página, una palabra facilmente reconocible por humanos aociada a una IP. https://www.ionos.es/ tiene buenos precios. Creo el dominio o subdominio y ajusto los registros DNS, el A, para que apunte al hosting donde voy a desplegar el Docker. (Por ejemplo: el A a 49.13.192.32). Podemos comprobar su propagación
<kbd><img src="https://jorgebenitezlopez.com/github/propagaciondns.png" style="border:1px solid grey"></kbd>
- En nuestro servidor/hosting. En este caso con Plesk como sistema de administración creamos un espacio para el dominio
<kbd><img src="https://jorgebenitezlopez.com/github/espaciodominio.png" style="border:1px solid grey"></kbd>
- Añadir un certificado gratuito SSL/TLS para el https. Lo instalo en el hosting y añador un registro TXT en el dominio y verifico que el certificado se ha instalado correctamente
<kbd><img src="https://jorgebenitezlopez.com/github/certificado.png" style="border:1px solid grey"></kbd>
<kbd><img src="https://jorgebenitezlopez.com/github/registrodns.png" style="border:1px solid grey"></kbd>
- Busco y me descargo la imagen de Docker Hub
<kbd><img src="https://jorgebenitezlopez.com/github/descargoimg.png" style="border:1px solid grey"></kbd>
- Configuro los parámetros para que el contenedor que construyo con esa imagen funcione correctamente (Mapeo los puertos para externamente pueda acceder a través del 3273)
<kbd><img src="https://jorgebenitezlopez.com/github/configurolaimagen.png" style="border:1px solid grey"></kbd>
- El puerto en el servidor responde con la app: http://factoriaf5.item.host:3273/
- El último paso es configurar mi servidor para que el hosting apunte al puerto del servidor donde tengo el docker
<kbd><img src="https://jorgebenitezlopez.com/github/reglainversa.png" style="border:1px solid grey"></kbd>
y listo ya tengo la app desplegada en mi dominio con https: https://register3.coderf5.es/
<kbd><img src="https://jorgebenitezlopez.com/github/verificodocker.png" style="border:1px solid grey"></kbd>

## Más recursos para el despliegue en otros servidores

- Hosting free: https://www.000webhost.com/
- Firebase: https://firebase.google.com/docs/database
- Fly.io: https://fly.io/
- Netlify: https://www.netlify.com/pricing/
- Northflank: https://northflank.com/



