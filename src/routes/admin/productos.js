const express = require('express');
const router = express.Router();
const pool = require('../../database');
const path = require('path');

/*Método para listtar productos*/

router.get('/', async (req, res) => {
    const productos = await pool.query(`SELECT produc.id_productos, produc.nombre, produc.marca, produc.precio, produc.descripcion, produc.cantidad, est.estado, cat.categoria, usua.nombre_usuario,
    produc.id_categorias
    FROM  productos produc, estados est, categorias cat, usuarios usua
    WHERE produc.id_estado = est.id_estado AND 
    cat.id_categorias = produc.id_categorias
    AND produc.id_usuarios = usua.id_usuario AND est.id_estado = 1`);
    const categorias = await pool.query(`SELECT * FROM categorias`);
    //console.log(categorias);
    res.render('links/admin/productos', {
        layout: "main_admin",
        productos: productos,
        categorias: categorias
    });
});



/*Método para añadir productos*/
router.post('/agregar', async (req, res) => {

    const imagen = req.files.imagen

    const {
        nombre,
        marca,
        precio,
        cantidad,
        descripcion,
        id_categorias
    } = req.body;

    const array = {
        nombre,
        marca,
        precio,
        cantidad,
        descripcion,
        id_categorias,
        imagen: imagen.name,
    };

    imagen.mv(path.join('src/public/fotos/', imagen.name));

    await pool.query(`INSERT INTO productos set ?`, [array]);
    res.redirect('back')
});

/*Método para editar productos*/

router.post('/editar/:id_productos', async (req, res) => {
    const {
        id_productos
    } = req.params;
    const imagen = req.files.imagen

    const {

        nombre,
        marca,
        precio,
        cantidad,
        descripcion,
        id_categorias
    } = req.body;
    const updateProductosUsua = {
        nombre,
        marca,
        precio,
        cantidad,
        descripcion,
        id_categorias,
        imagen: imagen.name,
    };
    imagen.mv(path.join('src/public/fotos/', imagen.name));
    updateProductosUsua.id_usuarios = req.user.id_usuario;
    await pool.query('UPDATE productos set ? WHERE id_productos = ?', [updateProductos, id_productos]);
    console.log(updateProductos);
    res.redirect('back');

});

/*Método para eliminar productos*/

router.get('/eliminar/:id_productos', async (req, res) => {
    const {
        id_productos
    } = req.params;
    await pool.query(`delete from productos WHERE id_productos = ?`, [id_productos]);
    res.redirect('back');
});

module.exports = router;