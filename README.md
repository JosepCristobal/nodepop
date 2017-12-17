# Ejemplos curso Mobile Bootcamp 6 Keepcoding

## Para arrancar MongoDB podemos usar

./bin/mongod --dbpath ./data/db --directoryperdb
## Despliegue

Copiar .env.example a env y revisar los valores

## Para ejecutar el proyecto en modo desarrollo

npm run dev

Creamos carpeta NODEPOP
Instalamos Express con: express --ejs --git nodepop
Init: npm init
Instalamos dependencias: npm install
Instalamos módulo para acceso a variables de entorno: npm install dotenv
Instalamos cross-env par compatibilizar variables de entorno para diferentes S.O.: npm install cross-env
Instalamos Mongoose para acceso a la BBDD: npm install mongoose
Creamos carpeta routes/apiv1 para el versionado de los diferentes APIs.
Creamos carpeta /lib para almacenar las librerías, como la conexión de Mongoose a MongoDB
Creamos la carpeta /models para almacenar los modelos
Para la autenticación JWT instalamos : npm install jsonwebtoken
Creamos carpeta en public/images/anuncios
Creamos fichero en /lib/CreateDB para poner el código de vaciado y carga de la BBDD
Creamos libreria jwtAuth para la validación de usuarios de jwt
Creamos la carpeta /models para crear los modelos.
En app.js añadimos la linea //Rutas del APIv1
En App // Cargamos el conector a la base de datos
Para la encriptación del password despues de documentarme, decido utilizar bcrypt
Link sobre articulo en español: https://solidgeargroup.com/password-nodejs-mongodb-bcrypt?lang=es
instalamos con npm: npm install bcrypt
instalamos mongoose-validate: npm install mongoose-validate
Ya podemos recibir login y pass y podemos verificar si son correctos
los parametros se recogen de la Url http://localhost:3000/apiv1/usuarios/?email=pepe@pepe.moc&clave=1234
Creamos un midelware para que nos permita vaciar Mongo Nodepop y recargar datos nuevos en la BBDD
Creamos en /bin un fichero install_db
Y en package.json modificamos para que con npm run install_db podamos generar datos para la BBDD
Creamos carpeta config para guardar los ficheros a importar de anuncios, usuarios y insternalización
Problemas----dejamos pendiente
Creamos las rutas para los anuncios con consultas, etc
Creamos el insert a traves de las rutas y en el metodo post
Creamos la consulta con los parametros y filtros  metodos GET
encontramos información de las querys y parametros en la ruta de la url
https://www.npmjs.com/package/mongo-querystring
Aplicamos filtro por tags en anuncios
empezamos con la autenticación
dejamos la consulta de usuarios ya que la tenemos hecha.
ya somos capaces de devolver el token de la autenticación con el id de usuario.
Instalamos dotenv para poder crear variable de entorno en .env
Para insertar un array en el módulo de anuncios pasaremos tantos tags como tipos tengamos de tags
Activado el includeTotal, este nos devolverá la cantidad total de registros de la consulta
en /bin creamos install_db

**Para más información consultar en la [WIKI](https://github.com/JosepCristobal/nodepop/wiki) del proyecto 

