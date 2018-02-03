'use strict';

const express = require('express');
const router = express.Router();
const misTags = process.env.TAGS;
const jwtAuth = require ('../../lib/jwtAuth');

//Activamos la identificación de usuario a tavés de su token, en todas las rutas
router.use(jwtAuth(),(req,res,next) => {
    //En este punto podemos recuperar el _id del usuario a través de su token
    const usuarioId=res.userId;
    next();
});

/**
 * GET /Tags
 * Obtener validación de usuario
 */
router.get('/', (req, res, next) => {
    const misTags2 = misTags.split(",");
    
   res.json({succes: true, result: misTags2});
   return;
   next();
});
   
module.exports = router;