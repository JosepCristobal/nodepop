'use strict';
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10 ;
const REQUIRED_PASSWORD_LENGTH = 6;
const express = require ('express');
const router =express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');

router.post('/',async (req, res, next) => {
    //recogemos las credenciales
    // lo hacemo con post y lo pondremos en el body
    const email = req.body.email;
    const clave = req.body.clave;

    //Buscamos en la base de datos en usuarios
    if (email && clave){
    try{
        const filter = {};
        filter.email = email;
    //Llamamos al metodo Usuario.findByEmailAndPasswordS que hemos creado en el modelo
        const rows = await Usuario.findByEmailAndPasswordS(filter);
        var resultadoEnc = false;
        if(rows.name && clave){          
            //Comparamos la clave facilitada con la guardada en la BBDD encriptada
            resultadoEnc = bcrypt.compareSync(clave, rows.clave);
        }
        //Si la comparación de claves ha sido satisfactoria, procedemos a generar el Token    
        if (resultadoEnc===true){
            const user = { _id: rows._id};
        //Si el usuario existe y la pass coincide, cremaos un token
    jwt.sign({user_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    }, (err, token) => {
        if(err){
         next(err);
         return;
    }  
    // y lo devolvemos
    res.json({success: true, token: token});
      
    });

        }else{
            res.status = 401;
            res.json({ error: 'Credenciales incorrectas'});
            return;
        }

    }catch (err){
        next(err)
    };
    }else{
        res.status = 401;
        res.json({ error: 'Credenciales obligatorias'});
        return;
    };

});
module.exports = router;