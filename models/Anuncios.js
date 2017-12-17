'use strict';

const mongoose = require('mongoose');

//primero creamos el esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta : Boolean,
    precio: {type: Number, index: true},
    foto: String,
    tags: {type:[String], index: true}
});


// Creamos un método estático para la búsqueda de articulos
//búsqueda paginada
anuncioSchema.statics.list = function(filters,limit, skip, sort, fields){
    //obtenemos la query sin ejcutarla
    const query = Anuncios.find(filters);
    query.limit (limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
// ejecutamos la query y devolemos una promesa
    return query.exec();
}

// Creamos un método estático para el recuento de articulos según criterios de búsqueda
anuncioSchema.statics.countTot = function(filters){
//obtenemos la query sin ejcutarla
const queryC = Anuncios.count(filters);
  
// ejecutamos la query y devolemos una promesa
    return queryC.exec();
}

// y por último creamos el modelo

const Anuncios = mongoose.model('Anuncios', anuncioSchema);

//y lo exportamos

module.exports = Anuncios;