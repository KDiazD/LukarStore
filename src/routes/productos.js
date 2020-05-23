const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/Home', async(req,res)=>{
    //const productos = await pool.query('');
    res.render('links/home');
});

router.get('/listado_productos', async(req, res)=>{
    res.render('links/producto');
});


module.exports = router;