const express = require('express');
const router = express.Router();
const pool = require('../database');

/* ruta para listar productos(home)*/
router.get('/Home', async(req,res)=>{
    //const productos = await pool.query('');
    res.render('links/home');
});

/* ruta para la descripción de cada producto*/
router.get('/listado_productos', async(req, res)=>{
    res.render('links/producto');
});

/* Ruta para traer carrito de compras*/
router.get('/carro_compras', async(req,res)=>{
    res.render('links/carritocompras');
});

module.exports = router;