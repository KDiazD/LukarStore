const express = require('express');
const router = express.Router();
const pool = require('../database');



router.get('/', async(req,res)=>{
    //const productos = await pool.query('');
    res.render('links/home');
});

module.exports = router;