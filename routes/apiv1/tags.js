'use strict';

const express = require('express');
const router = express.Router();
const misTags = process.env.TAGS.split(",")
const jwtAuth = require ('../../lib/jwtAuth');

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
   res.json({succes: true, result: misTags});
   return;
   next();
});
   
module.exports = router;