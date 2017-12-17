'use strict';
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const async = require('async');
// cargar el modelo Usuario
const Usuario = require('../models/Usuario');
// Cargamos el conector a la base de datos y la dejamos a punto de utilizar
const Mongoose = require('../lib/connectMongoose')
// cargar el modelo Anuncios
const Anuncios = require('../models/Anuncios');
// Ficheros
const fs = require('fs');
const path = require('path'); 
const fichUsuarios = path.join('./config', 'usuariosImp.js');
const fichAnuncios = path.join('./config', 'anunciosImp.js');

/**
* DELETE /usuarios
* Elimina todos los usuarios
*/
async function borrarUsr(){
   try{
        await Usuario.remove({});
        console.log('success usuarios:', true);
        return
    }catch (err){
        console.log('success usuarios:', KO);
        return(err);
   }}

/**
 * DELETE /auncios
 * Elimina todos los anuncios
 */
 async function borraAnuncio(){  
    try{
    await Anuncios.remove({});
        console.log('success borrar anuncios:', true);
        return;
   }catch (err){
        console.log('error en borrar anuncios:',err);
        return (err);
    }
   
}

//Leemos de un fichero de anuncios y usuarios, en el path config y en formato JSON para insertar registros en la BBDD
async function CargaMisAnuncios(callback) {
 
        await fs.readFile(fichAnuncios, {encoding: 'utf8'}, function(err, data) {
            if (err) {
                console.log(err);
                return (err);
            }
            try {
                data = JSON.parse(data);
                console.log(data);
            } catch (err) {
                console.log('data',err)
                return (err);
            }
            async.each(data.anuncios, (function(item) {
                new Anuncios(item).save(function(err, nuevoAnuncio) {
                    if (err) {
                       console.log('Error al crear anuncio', err);
                       return callback(err);
                   }
                    console.log('Anuncio ' + nuevoAnuncio.nombre + ' creado');
                });
            }));
            //Mongoose.close();
            return (null, 'altaAnuncios');          
        });
}

//Cargamos el fichero de usuarios para insertarlos en la BBDD
async function CargaMisUsuarios(callback) {
 
    await fs.readFile(fichUsuarios, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            console.log(err);
            return (err);
        }
        try {
            data = JSON.parse(data);
            console.log(data);
        } catch (err) {
            console.log('data',err)
            return (err);
        }
        async.each(data.usuarios, (function(item) {
            new Usuario(item).save(function(err, nuevoUsuario) {
                if (err) {
                   console.log('Error al crear usuario', err);
                   return callback(err);
               }
                console.log('Usuario ' + nuevoUsuario.name + ' creado');
            });
        }));
        //Mongoose.close();
        return (null, 'altaUsuarios');          
    });
}
//Ejecutamos todas las funciones de borrado y carga 
borrarUsr();
borraAnuncio();
CargaMisUsuarios();
CargaMisAnuncios();
