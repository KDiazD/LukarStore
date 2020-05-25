const express = require('express');
const router = express.Router();
const pool =require('../database');

/*Login*/
router.get('/login', async(req,res)=>{
    res.render('links/login');

});

/*Perfil*/
router.get('/perfil', async(req,res)=>{
    res.render('links/perfil');
});

module.exports = router;