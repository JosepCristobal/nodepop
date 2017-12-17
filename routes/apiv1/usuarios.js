'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10 
const REQUIRED_PASSWORD_LENGTH = 6
const jwtAuth = require ('../../lib/jwtAuth');

//Activamos la identificación de usuario a tavés de su token, en todas las rutas
router.use(jwtAuth(),(req,res,next) => {
    //En este punto podemos recuperar el _id del usuario a través de su token
    const usuarioId=res.userId;
    next();
});

// cargar el modelo Agente
const Usuario = require('../../models/Usuario');

/**
 * Damos de alta usuarios 
 * con método POST
 */

router.post('/', async (req,res,next) => {
    //Creamos un usuario  en memoria segun su modelo ya definido
    if(!req.body.name||!req.body.clave||!req.body.email){
        console.log('No se puede insertar usuario nuevo, faltan datos')
        next(err)
    }else{
        //Verificamos la integridad de la cuenta de correo con una expresión regular
        const ExpresionCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (!ExpresionCorreo.test(req.body.email)){
            console.log('error de formato')
            new Error('Formato de correo, NO válido');
            next(err)
            return ;
        } else {
            //Debemos verificar que la cuenta de correo no exista en la Base de datos
            const filterV = {};
            filterV.email = req.body.email;
            //llamamos al metodo Usuario.findByEmailAndPasswordS que hemos creado en el modelo
            const rowsV = await Usuario.findByEmailAndPasswordS(filterV);

        if(rowsV){
            console.log('Usuario duplicado')
            const err = new Error('Usuario duplicado')
            next(err);
            return;
        }else{
            console.log('Usuario correcto')
        }
            //El correo ha pasado la prueva de validación
            const usuario = new Usuario(req.body);
            // lo persistimos en la coleccion de agentes
            usuario.save((err,usuarioGuardado)=> {
            if (err){
                next(err);
                return;
            }
            res.json({success: true, result: usuarioGuardado});
        });}}
    
    });
    
/**
 * GET /Usuario
 * Obtener validación de usuario
 * con usuario, password y token podremos consultar la lista de usuarios
 */

router.get('/', async (req, res, next) => {
    try{
        const email = req.query.email;
        const clave = req.query.clave;
        const limit = parseInt(req.query.limit); // Numbrer(str)
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        const fields = req.query.fields;
        //creo el filtro vacío
        const filter = {};
    if(email){
        filter.email = email;
    }
    //llamamos al metodo Usuario.findByEmailAndPassword que hemos creado en el modelo
        const rows = await Usuario.findByEmailAndPassword(filter,limit,skip,sort, fields)
        var resultadoEnc = false;
        if(rows[0].name && clave){
            //Comparamos la clave facilitada con la guardada en la BBDD encriptada
            resultadoEnc = bcrypt.compareSync(clave, rows[0].clave);
        }
        res.json({succes: true, result: rows});
        console.log('resultado: ', resultadoEnc)
    }catch (err){
        next(err)
    };
});

/**
 * DELETE /usuarios
 * Elimina un usuario
 */
router.delete('/:id', async (req,res, next) =>{
    try{
    const _id = req.params.id;
    await Usuario.remove({_id: _id }).exec();
    res.json({success: true});
    }catch (err){
        next(err);
    }

})


module.exports = router;