const express = require('express');
const router = express.Router();
const pool = require('../database');
const {
    isLoggedIn
} = require('../lib/auth');
const path = require('path');

/* ruta para listar productos(home)*/


/* ruta para la descripción de cada producto*/
router.get('/listado_productos', async (req, res) => {
    res.render('links/producto');
});

/* Ruta para traer carrito de compras*/
router.get('/carro_compras', async (req, res) => {
    res.render('links/carritocompras');
});

/*Ruta para finalizaar pedido*/

module.exports = router;