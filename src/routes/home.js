const express = require('express');
const router = express.Router();
const pool = require('../database');
const path = require('path');


/*Ruta para listar productos generales*/
router.get('/', async (req, res) => {
    const ListadoProductosGene = await pool.query(`SELECT produc.id_productos, produc.nombre, produc.precio, produc.imagen
    FROM productos produc`);
    const ImBan = await pool.query(`SELECT banners.id_banner, banners.img AS banner
    FROM banners WHERE banners.id_banner = 2`)
    const ImgBanner = await pool.query(`SELECT banners.id_banner, banners.img
    FROM banners`);
    console.log(ImgBanner);
    res.render('links/home', {
        ListadoProductosGene: ListadoProductosGene,
        ImgBanner: ImgBanner,
        ImBan: ImBan,
    });
});


module.exports = router;