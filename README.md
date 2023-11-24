# 👨‍💻 Control Gastos Subsidios 👨‍💻

# Tecnologías usadas

Comúnmente los proyectos de desarrollo de aplicaciones tienen dos partes básicas: Front-end
(lado del cliente) y Back-end (lado del servidor), que se combinan en el desarrollo de Full-stack.
En este proyecto se decidió utilizar el stack `PERN`, el cual consiste en PostgreSQL, ExpressJS, ReactJS y NodeJS, tecnologías populares en el desarrollo Full-stack.

## PostgreSQL

Es un motor de base de datos de código abierto poderoso, muy popular en la actualidad. Más allá de eso, la principal razón por la cual se escogió este motor es porque el SIU Pilagá
(Módulo económico, presupuestario, financiero y contable, hermano del SIU Guaraní) utiliza
PostgreSQL. Una de las mejoras importantes que se planteó para el futuro en conversaciones
con el usuario, sería el conectar este proyecto con el servicio de Pilagá. Así que se consideró
que lo mejor era utilizar la misma tecnología para facilitar el trabajo al equipo que deseara
desarrollar esa conexión.

## ExpressJS

Es un framework gratuito que permite facilitar la implementación y desarrollo de aplicaciones
web. La razón de su elección es el excelente trabajo en conjunto que realiza con las demás
tecnologías presentadas.

## ReactJs

React es una biblioteca para construir interfaces de usuario, ReactJS es una de las librerías más populares de JavaScript para el desarrollo de aplicaciones móviles y web, la cual contiene una colección de fragmentos de código JavaScript reutilizables utilizados para crear interfaces de usuario (UI) llamadas componentes.
Es importante señalar que ReactJS no es un framework de JavaScript.
Propone una arquitectura basada en componentes, que son piezas de código en las que se utiliza HTML, CSS y Javascript, de modo que contienen tanto la lógica como la presentación.
Se consideró usar el mismo ya que todo el equipo tenía gran conocimiento sobre esta biblioteca y su amplio soporte online.

## NodeJS

Es un entorno en tiempo de ejecución que permite correr lenguaje Javascript de una manera eficiente y
escalable, de código abierto, multi-plataforma, que permite a los desarrolladores crear toda clase de
herramientas de lado servidor y aplicaciones en JavaScript.
Fue escogida por su amplio soporte online en caso de dificultades.

# Descarga e instalación

## GitHub

Para descargar el proyecto se deberá contar con github instalado, el cual es un sistema de control de versiones distribuido que ayudará a realizar un seguimiento de los cambios en tu código fuente y permite una colaboración fluida entre desarrolladores.
Aquí se encontrará la documentación introductoria de GitHub:[Github Started](https://docs.github.com/es/get-started)

## Descargar e instalar NodeJS

Para publicar e instalar paquetes hacia y desde el registro público de npm o un registro privado de npm, se deberá instalar Node.js y la interfaz de línea de comandos de npm mediante un administrador de versiones de Node o un instalador de Node.

Link de descarga: [NodeJS - NPM](https://nodejs.org/en/download) .

## Front-end (Local)

#### Para descargar e instalar el proyecto del lado Front-End localmente se deben seguir los siguientes pasos.

**1. Clonar o descargar el repositorio**

Para clonar el repositorio se puede hacer desde una terminal de windows o desde la herramienta bash con el siguiente comando:`git clone https://github.com/unahur-desapp/control-gastos-subsidios-frontend.git` .

Para descargarlo ingresar al link del repositorio: [Front-end](https://github.com/unahur-desapp/control-gastos-subsidios-frontend).

**2. Instalación de dependencias**

Una vez descargado o clonado el proyecto debemos abrir una terminal, situarnos donde descargamos o clonamos el proyecto.
Ej: "C:\Users\Windows\Proyecto\control-gastos-subsidios-frontend".

Ejecutar el comando `npm i` o `npm install` (para instalar las dependencias).
Luego de finalizar la instalación de las mismas, se debe ejecutar el comando `npm start` para correr el proyecto localmente en la url _“localhost:3000”_.
Esto dejará operativo el proyecto mientras no se cierre la terminal, se debe recordar que hasta que no esté instalado y en ejecución el backend nadie responderá tus consultas y por ende no podrás iniciar sesión.

# Back-end (Local)

#### Para descargar e instalar el proyecto del lado Back-End localmente se deben seguir los siguientes pasos.

**1. Clonar o descargar el repositorio**

Al elegir clonar el repositorio se puede hacer desde una terminal con el comando `git clone https://github.com/unahur-desapp/control-gastos-subsidios-backend.git`

Para descargarlo ingresar al link del repositorio: [Back-end](https://github.com/unahur-desapp/control-gastos-subsidios-backend).

**2. Descargar e instalar el motor de base de datos postgres**

Se necesita instalar el motor de base datos y de preferencia un gestor para administrar la misma. Como motor se debe instalar Postgres y como herramienta de gestión recomendamos pgAdmin.
Para ello dejamos un link donde puedes descargar ambos de un mismo lugar: [Postgres y pgAdmin](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

En caso de no funcionar el link se puede descargar el motor de base de datos postgres por algún otro link y pgAdmin de su página oficial.

**3. Configurar base de datos**

Al utilizar la herramienta pgAdmin, una vez instalado se deberá configurar un servidor. Ejecutar el pgAdmin y el mismo solicitará configurar un servidor nuevo, en caso de no ser así se deberá hacer click secundario lo que abrirá un desplegable -> Servers -> Register -> Server.

- En la sección `General` se deberá poner un nombre en el campo `name`.
- En la sección `Connection` se deberá configurar el `Host name` = `localhost` y el `Port` = `5432` , ponle un `usuario` = `postgres` y una `contraseña` = `admin`; El usuario y la contraseña más adelante serán utilizadas por el back-end para comunicarse con la base. `Save`.

También hay que crear una base de datos. En el servidor creado al hacer click secundario se abrirá un desplegable -> Create -> DataBase

- En la sección `General` solo se deberá poner un nombre en el campo`database`.
- Al finalizar click en `Save`.

**4. Modificar las variables de entorno**

En el repositorio clonado anteriormente se visualizará un archivo con nombre `.env.development` si no existe se deberá crear. El mismo se deberá modificar con los datos de la base de datos, la cual fue creada en el paso anterior.
Te dejamos un ejemplo de cómo se debería ver el archivo.

```
SQL_USERNAME=postgres
SQL_PASSWORD=admin
SQL_DATABASE=nombreDeTuBase
SQL_HOST=localhost
SQL_PORT=5432
SQL_TEST_DATABASE=nombreDeTuBaseDeTest
```

En este archivo se encuentran las variables que va a usar la aplicación para comunicarse con la base de datos.

**5. Instalación de dependencias**

Abrir una terminal, situarse donde se descargó o clonó el proyecto. Ej: "C:\Users\Windows\Proyecto\control-gastos-subsidios-backend".
Ejecutamos el comando `npm i` o `npm install` (para instalar las dependencias).
Esperar la instalación de las mismas.

**6. Migración de la base**

PSe deberá abrir una terminal o usar la misma que en el punto anterior, lo que se necesitará es situarse donde se descargó o clonó el proyecto. Para migrar la base, solo habrá que utilizar el comando `npm run db:init` para crear la base y `npm run db:seed` para cargar un set de datos.

**7. Arrancar el proyecto**

Para ello hay que situarse en el proyecto y ejecutar el comando `npm start` para correr el proyecto localmente.El mismo quedará operativo en la url _“localhost:3001”_.
Esto dejará en funcionamiento la base de datos mientras no se cierre la terminal, la cual responderá a las consultas del front-end.

## Colección

Se deja asentado un link con la colección y sus métodos funcionales en localhost, la misma fue generada y extraída en Postman que es la aplicación que nos permite testear APIs a través de una interfaz gráfica de usuario.

[Colección](https://grupo4-unahur.postman.co/workspace/Subsidios~ca6cdd2f-a9dc-4aee-a453-e99991b1fca5/collection/23966358-8480fbe9-da46-4fb9-89ea-c9d3fa36dbdf?action=share&creator=20821660)
