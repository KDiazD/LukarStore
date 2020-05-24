const express = require('express');
const router = express.Router();
const pool =require('../database');

/*Login*/
router.get('/login', async(req,res)=>{
    res.render('links/login');

});

module.exports = router;