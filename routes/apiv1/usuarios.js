'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10 
const REQUIRED_PASSWORD_LENGTH = 6
//const basicAuth = require('../../lib/basicAuth');
//const jwtAuth = require ('../../lib/jwtAuth');

// cargar el modelo Agente
const Usuario = require('../../models/Usuario');


router.post('/', (req,res,next) => {
    //Creamos un usuario  en memoria segun su modelo ya definido
        const usuario = new Usuario(req.body);
        // lo persistimos en la coleccion de agentes
        usuario.save((err,usuarioGuardado)=> {
            if (err){
                next(err);
                return;
            }
            res.json({success: true, result: usuarioGuardado});
        });
    
    });
    
    /**
 * GET /Usuario
 * Obtener validación de usuario
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
module.exports = router;