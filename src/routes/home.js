const express = require('express');
const router = express.Router();
const pool = require('../database');
const path = require('path');


/*Ruta para listar productos generales*/
router.get('/', async (req, res) => {
    const ImgBanner = await pool.query(`SELECT banners.id_banner, banners.img
    FROM banners`);
    const busquedaHeader = await pool.query(`SELECT produc.id_productos, produc.nombre, produc.precio, produc.imagen, produc.descripcion, produc.marca
    FROM productos produc
    WHERE produc.nombre LIKE '%${req.query.search ? req.query.search : ''}%'`)
    res.render('links/home', {
        ImgBanner: ImgBanner,
        busquedaHeader: busquedaHeader,
    });
});


module.exports = router;