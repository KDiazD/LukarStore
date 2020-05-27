const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const path = require('path');
const {
    isLoggedIn
} = require('../lib/auth');
const {
    isNoLoggedIn
} = require('../lib/auth');

/*Login*/
router.get('/login', isNoLoggedIn, async (req, res) => {

    res.render('links/login');

});

/*Ruta para login*/
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/usuarios/perfil',
        failureRedirect: '/usuarios/login',
        failureFlash: true
    })(req, res, next);

});

router.post('/registrar', passport.authenticate('local.registro', {
    successRedirect: '/usuarios/perfil',
    failureRedirect: '/usuarios/login',
    failureFlash: true
}));
/*Ruta para cerrar sesión*/
router.get('/salir', (req, res) => {
    req.logOut();
    res.redirect('/usuarios/login');
});

/*Perfil*/
router.get('/perfil', isLoggedIn, async (req, res) => {

    res.render('links/perfil', {
        FormularioUsua: true
    });
});
/*Listar productos por usuarios*/

router.get('/perfil_productos', isLoggedIn, async (req, res) => {
    const ListaProductosUsua = await pool.query(` SELECT produc.id_productos, produc.nombre, produc.marca, produc.precio, produc.descripcion, produc.cantidad, est.estado, cat.categoria,
    produc.id_categorias
    FROM  productos produc, estados est, categorias cat, usuarios usua
    WHERE produc.id_estado = est.id_estado AND 
    cat.id_categorias = produc.id_categorias
    AND produc.id_usuarios = usua.id_usuario AND usua.id_usuario = ?`, req.user.id_usuario);
    const categorias = await pool.query(`SELECT * FROM categorias`);
    console.log(ListaProductosUsua);
    res.render('links/perfil', {
        ListaProductos: true,
        ListaProductosUsua: ListaProductosUsua,
        categorias: categorias
    });
});


router.post('/perfil', async (req, res) => {
    const updateUsua = req.body;
    await pool.query('UPDATE usuarios set ? WHERE id_usuario = ?', [updateUsua, req.user.id_usuario]);
    console.log(updateUsua);
    res.redirect('back');

});



/*Ruta para agregar productos*/
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

    const addProductosUsua = {
        nombre,
        marca,
        precio,
        cantidad,
        descripcion,
        id_categorias,
        imagen: imagen.name,
    };


    imagen.mv(path.join('src/public/fotos/', imagen.name));
    addProductosUsua.id_usuarios = req.user.id_usuario;

    await pool.query(`INSERT INTO productos set ?`, [addProductosUsua]);
    res.redirect('back')
});

router.post('/editar/:id_productos', async (req, res) => {
    const {
        id_productos
    } = req.params;
    const updateProductosUsua = req.body;
    updateProductosUsua.id_usuarios = req.user.id_usuario;
    await pool.query('UPDATE productos set ? WHERE id_productos = ?', [updateProductosUsua, id_productos]);
    console.log(updateProductosUsua);
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