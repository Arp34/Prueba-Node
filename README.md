# API Template

Template base para el desarrollo de APIs utilizando Express, TypeScript, Sequelize y PostgreSQL.

## Requisitos previos

Para poder ejecutar este proyecto localmente, es necesario contar con las siguientes herramientas instaladas en el sistema:

* Node.js (Version 18 o superior recomendada)
* Docker y Docker Compose
* Git

## Inicializacion rapida desde cero

Siga estos pasos de manera secuencial para configurar e iniciar el entorno de desarrollo:

1. Clonar el repositorio del proyecto:
   git clone <URL_DEL_REPOSITORIO>
   cd "aBase de Proyectos Node"

2. Instalar las dependencias del proyecto:
   npm install

3. Crear el archivo de variables de entorno copiando la plantilla de ejemplo:
   cp .env.example .env

4. Levantar la base de datos PostgreSQL utilizando Docker Compose:
   docker compose up -d

5. Iniciar la aplicacion en modo de desarrollo con recarga automatica:
   npm run dev

## Configuracion de puertos y resolucion de conflictos

El proyecto esta configurado para ejecutarse en los siguientes puertos de manera predeterminada:

* API del servidor: Puerto 3000 (configurable mediante la variable PORT en el archivo .env).
* Base de datos PostgreSQL en Docker: Puerto externo 5434 (mapeado al puerto interno 5432 del contenedor).

### Conflicto de puertos en Docker
Si el puerto 5434 ya esta ocupado por otra instancia local de PostgreSQL u otro servicio en su sistema, el contenedor fallara al iniciar. Para resolver esto:

1. Abra el archivo docker-compose.yml.
2. Modifique la seccion ports en el servicio postgres. Cambie el primer numero (puerto host) por uno libre, por ejemplo "5435:5432".
3. Abra su archivo .env y actualice la variable DB_PORT con el nuevo puerto host (ejemplo: DB_PORT=5435).
4. Reinicie el contenedor ejecutando:
   docker compose down
   docker compose up -d

## Estructura de carpetas y creacion de nuevas entidades

El proyecto sigue una arquitectura organizada y modular:

* src/config: Archivos de configuracion (base de datos, documentacion de Swagger).
* src/controllers: Logica de control que gestiona las peticiones HTTP y respuestas de la API.
* src/middlewares: Funciones intermedias como la validacion de tokens JWT para proteger las rutas.
* src/models: Definicion de los esquemas, relaciones y validaciones de los modelos de Sequelize.
* src/routes: Mapeo de rutas y endpoints HTTP de la aplicacion.
* src/seeds: Archivos para la insercion de datos iniciales en la base de datos.
* src/types: Extensiones de tipos de TypeScript (por ejemplo, para extender la interfaz Request de Express).

### Donde crear nuevas entidades para la prueba tecnica
Para agregar una nueva tabla o recurso en la prueba:
1. Crear el modelo en src/models/<entidad>.ts extendiendo de Model de Sequelize. Importar la conexion de base de datos desde ../config/database.js.
2. Crear el controlador en src/controllers/<entidad>.controller.ts e implementar las funciones CRUD.
3. Crear el enrutador en src/routes/<entidad>.routes.ts definiendo los endpoints (POST, GET, PUT, DELETE).
4. Importar y registrar el nuevo enrutador en el archivo principal src/index.ts (ejemplo: app.use("/api/entidades", entidadRoutes)).

## Sincronizacion de Base de Datos y Carga de Seeds

### Sincronizacion con Sequelize
El proyecto utiliza la sincronizacion automatica de Sequelize al levantar el servidor (sequelize.sync() dentro de src/index.ts).
* Para actualizar las tablas segun los cambios realizados en los archivos de modelos en desarrollo, puede agregar temporalmente la opcion alter: true (ejemplo: await sequelize.sync({ alter: true })) dentro del archivo src/index.ts.
* Nota: No use force: true en entornos de desarrollo avanzados a menos que desee borrar todos los datos existentes de las tablas en cada reinicio.

### Cargar Seeds (Datos de Prueba)
Para inicializar la base de datos con datos de prueba predefinidos (como un usuario administrador o registros iniciales), ejecute el siguiente comando:

npm run seed

Este comando ejecutara el script ubicado en src/seeds/seed.ts que insertara la informacion inicial en la base de datos PostgreSQL.

## Guia de uso de la documentacion de la API (Swagger)

La API cuenta con documentacion autogenerada e interactiva mediante Swagger.

1. Asegurese de tener el servidor corriendo (npm run dev).
2. Abra su navegador web y acceda a la siguiente URL:
   http://localhost:3000/api-docs
3. Desde esta interfaz podra visualizar todos los endpoints disponibles de la API (Auth, Examples, etc.), inspeccionar las estructuras de datos esperadas (schemas) y realizar peticiones directamente de prueba utilizando el boton "Try it out".
