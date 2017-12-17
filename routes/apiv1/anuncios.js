'use strict';

const express = require('express');
const router = express.Router();
const jwtAuth = require ('../../lib/jwtAuth');

// cargar el modelo Anuncios
const Anuncios = require('../../models/Anuncios');
//Activamos la identificación de usuario a tavés de su token, en todas las rutas
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
 * Obtener una lista de anuncios con posibles filtros 
 */
router.get('/', async (req, res, next) => {
    try{
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const precio =req.query.precio;
        const tags = req.query.tags;
        const limit = parseInt(req.query.limit); 
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        const fields = req.query.fields;
        console.log(req.query);
        //creo el filtro vacío
        let filter = {};
    if(nombre){
        //Verificamos si existe nombre y generamos un filtro con expresión regular
        //para buscar por la coincidencia de las primeras letras del nobre de articulo
        filter.nombre = { $regex: "^" + nombre, $options: "i" };
    }
    if(venta){
        // En este filtro determinamos si es un articulo en venta o búsqueda
        filter.venta = venta;
    }
    if(tags){
        //Si existe tag en el filtro, lo creamos
        const tagA = tags.split(",")
        filter.tags =  {$in: tagA};
    }
    if(precio){
        //En este punto filtramos por precio, desde-hasta, hasta, desde
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
        // En este punto determinamos si nos han pedido que determinemos el total de registros
        // en base al filtro (filter)
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