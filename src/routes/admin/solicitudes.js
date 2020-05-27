const express = require ('express');
const router = express.Router();
const pool = require('../../database');


router.get('/', async(req,res)=>{
    const productos = await pool.query(`SELECT produc.id_productos, produc.nombre, produc.marca, produc.precio, produc.descripcion, produc.cantidad, est.estado, cat.categoria, usua.nombre_usuario,
    produc.id_categorias AS id_cat
    FROM  productos produc, estados est, categorias cat, usuarios usua
    WHERE produc.id_estado = est.id_estado AND 
    cat.id_categorias = produc.id_categorias
    AND produc.id_usuarios = usua.id_usuario AND est.id_estado = 2`);
    const ConsultaEstado = await pool.query(`SELECT * FROM estados`);
    
    res.render('links/admin/solicitudes_productos',{layout: "main_admin", productos: productos, ConsultaEstado: ConsultaEstado});
});

/*Método para editar estado del producto */

router.post('/update/:id_productos', async(req,res)=>{
    const {id_productos} = req.params;
    const updateEstado = await pool.query ('UPDATE productos set ? WHERE id_productos = ?', [updateEstado, id_productos]);
    console.log(updateEstado);
    res.redirect('back');
});

module.exports=router;