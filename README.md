[WIKI](https://github.com/JosepCristobal/nodepop/wiki)
# **Nodepop API**
**Práctica JS/Node.js/Express, Mongo DB Boot VI (2017)**

El objetivo es dar soporte de Backend a una aplicación de venta de artículos de segunda mano, llamada Nodepop.

## Requisitos de instalación

### Requisitos previos
* Node version de desarrollo v8.9.1
* MongoDB versión de desarrollo v3.4.10
* Git

### Instalación
1. Clonar con git desde repositorio (https://github.com/JosepCristobal/nodepop)
2. Situarnos en carpeta nodepop
3. Instalamos las dependencia con $npm install.
4. Copiar .env.example a .env y revisar los valores
 
### Verificar existencia y arrancar MongoDB. 

En el directorio donde se instala MongoDB creamos la subcarpeta ./data/db.
Deberemos estar en la carpeta raiz de MongoDB.

Usaremos el siguiente comando para inicializar la Base de datos,

./bin/mongod --dbpath ./data/db --directoryperdb


### Para ejecutar el proyecto
Para la carga inicial de datos en la BBDD ejecutaremos:
$npm run installDB

Si queremos arrancar en modo desarrollo :
$npm run dev

Para arrancar en modo normal con una sola instancia :
$npm start

Para arrancar en modo cluster con múltiples instancias:
$npm cluster

### Operaciones del API
* Registro de usuarios (nombre, email, constraseña).
* Autenticación (email, contraseña).
* Consulta de anuncios según varios criterios de búsqueda.
* Creación de anuncios.
* Consulta de TAGs para clasificar los anuncios.

### Documentación 
Para más información consultar en la [WIKI](https://github.com/JosepCristobal/nodepop/wiki) del proyecto.

### Notas de versión
* 0.0.1 Start.

## Despliegue de la aplicación en servidor publico
Para poder hacer pruebas en un entorno real y siguiendo las indicaciones del curso de Devops, en las siguientes url
podremos ejecutar y evaluar la API:

 ### Páginas estáticas:
  * pepetrans.com
  * www.pepetrans.com
  * Ip pública : 35.178.11.9
 
 ### Acceso API Nodepop
  * node.pepetrans.com
 
 ### Acceso a página estatica para verificar cabecera.
   https://node.pepetrans.com/images/Anuncios/iPhone5S.jpg
   
  Para más información consultar en la [WIKI](https://github.com/JosepCristobal/nodepop/wiki) del proyecto.

### Autor
 Josep Cristobal
 
 
