'use strict';

const express = require('express');
const router = express.Router();
const jwtAuth = require ('../../lib/jwtAuth');

// cargar el modelo Agente
const Anuncios = require('../../models/Anuncios');
router.use(jwtAuth(),(req,res,next) => {
    //En este punto podemos recuperar el _id del usuario a través de su token
    const usuarioId=res.userId;
    next();
});


/**
 * Damos de alta anuncios 
 * con método POST
 */
router.post('/', (req,res,next) => {
    //Creamos un anuncio  en memoria segun su modelo ya definido
        const anuncios = new Anuncios(req.body);
        // lo persistimos en la coleccion de anuncios
        anuncios.save((err,anuncioGuardado)=> {
            if (err){
                next(err);
                return;
            }
            res.json({success: true, result: anuncioGuardado});
        });
    
    });
    
/**
 * GET /anuncios
 * Obtener una lista de agentes
 */
router.get('/', async (req, res, next) => {
    try{
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const precio =req.query.precio;
        const tags = req.query.tags;
        const limit = parseInt(req.query.limit); // Numbrer(str)
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        const fields = req.query.fields;
        console.log(req.query);
        //creo el filtro vacío
        let filter = {};
    if(nombre){
        console.log('has pasado por nombre', nombre);
        filter.nombre = { $regex: "^" + nombre, $options: "i" };
    }
    if(venta){
        filter.venta = venta;
    }
    if(tags){
        //Si existe tag en el filtro, lo creamos
        const tagA = tags.split(",")
        filter.tags =  {$in: tagA};
    }
    if(precio){
        const valorR = precio.split("-")
        if (valorR.length === 1){
            filter.precio = '50';
        }else if(valorR.length === 2){
            if (valorR[0]==='' && valorR[1]==='50'){
                filter.precio = {$lte: valorR[1]};
            }else if(valorR[1]==='' && valorR[0]==='10'){
                filter.precio = {$gte: valorR[0]};
            }else if(valorR[0]==='10' && valorR[1]==='50'){
                filter.precio = {$gte: valorR[0],$lte: valorR[1]};
            }else{
                next(err);
            }
        }else{
            next(err)
        }
        console.log('Campos a listar: ', fields)
    }
    //llamamos al metodo Anuncios.list que hemos creado en el modelo
        
        const rows = await Anuncios.list(filter,limit,skip,sort,fields);
        
        if (req.query.includeTotal==='true'){
            const rowsCount = await Anuncios.countTot(filter);
            res.json({succes: true,total: rowsCount, result: rows});
        }else{
             res.json({succes: true, result: rows});
        }

       
    }catch (err){
        next(err)
    };
});

module.exports = router;