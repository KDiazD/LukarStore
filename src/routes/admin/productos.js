const express = require ('express');
const router = express.Router();
const pool = require('../../database');

/*Método para listtar productos*/

router.get('/', async(req,res)=>{
    const productos = await pool.query(`SELECT produc.id_productos, produc.nombre, produc.marca, produc.precio, produc.descripcion, produc.cantidad, est.estado, cat.categoria, usua.nombre_usuario,
    produc.id_categorias AS id_cat
    FROM  productos produc, estados est, categorias cat, usuarios usua
    WHERE produc.id_estado = est.id_estado AND 
    cat.id_categorias = produc.id_categorias
    AND produc.id_usuarios = usua.id_usuario AND est.id_estado = 1`);
    const categorias = await pool.query(`SELECT * FROM categorias`);
    res.render('links/admin/productos',{layout: "main_admin", productos: productos, categorias: categorias});
});

/*Método para añadir productos*/
router.post('/agregar', async(req,res)=>{
    const addProductos = req.body;
    await pool.query(`INSERT INTO productos set ?`, [addProductos]);
    res.redirect('back');
});

module.exports = router;