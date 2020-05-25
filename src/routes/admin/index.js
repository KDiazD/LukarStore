const express = require ('express');
const router = express.Router();
const pool = require('../../database');

/*router.get('/', (req,res)=>{
    res.render('links/admin/home', {layout: "main_admin"});
});*/

router.get('/',async(req,res)=>{
    const prueba = await pool.query(`SELECT produc.nombre, produc.marca, produc.precio, produc.descripcion, produc.cantidad, cat.categoria
    FROM categorias cat, productos produc
    WHERE cat.id_categorias = produc.id_categorias`);
    console.log(prueba);
    res.render('links/admin/home',{layout: "main_admin", productos:prueba})
})

router.get('/usuarios', (req,res)=>{
    res.render('links/admin/usuarios',{layout: "main_admin"});
});


module.exports = router;