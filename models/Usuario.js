'use strict';

//const mongoose = require('mongoose');
const mongoose = require('mongoose')
,   validate = require('mongoose-validate')
,	bcrypt	 = require('bcrypt')
,	SALT_WORK_FACTOR = 10 
,	REQUIRED_PASSWORD_LENGTH = 6;

//primero creamos el esquema de usuario

var usuarioSchema = mongoose.Schema({
        email: { type: String, index: true},
        clave: String,
        name: String});

// Creamos la encriptación del password
usuarioSchema.pre('save', function(next){
    var self = this;
    if(!self.isModified('clave'))return next() 
    bcrypt.hash(self.clave, SALT_WORK_FACTOR, function(err,hash){
    if(err) return next(err)
    self.clave = hash;
    next()
        })
     });


  // Creamos un método estático
  usuarioSchema.statics.findByEmailAndPassword = function(filters,limit, skip, sort, fields){
    //obtenemos la query sin eejcutarla
    const query = Usuario.find(filters);
    query.limit (limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
// ejecutamos la queri y devolemos una promesa
    return query.exec();
}
  
 // Creamos un método estático
 usuarioSchema.statics.findByEmailAndPasswordS = function(filters){
    //obtenemos la query sin eejcutarla
    const query = Usuario.find(filters);
// ejecutamos la queri y devolemos una promesa
    return query.exec();
}

     // Creamos un método estático
usuarioSchema.statics.compara = function (password,user){
       // usuarioSchema.find({email: email}, function(err,user){
         //   if (err) return cb(err)
         //   if (!user) return cb()
             const resultado = bcrypt.compare(password, user.clave, (err,res) =>{
                    //console.log('Resultado final',err,res ? user:null);
                    if (err){
                        console.log('Error', err)
                    }
                   return;
               })
       // })
    } 
// Creamos un método estático
//usuarioSchema.statics.list = function(filters,limit, skip, sort, fields){
    //obtenemos la query sin eejcutarla
    //const query =Agente.find(filters);
    //query.limit (limit);
    //query.skip(skip);
   // query.sort(sort);
    //query.select(fields);
// ejecutamos la queri y devolemos una promesa
    //return query.exec();
//}

// y por ultimo creamos el modelo

const Usuario = mongoose.model('Usuario', usuarioSchema);

//y por ultimo lo exportamos

module.exports = Usuario;