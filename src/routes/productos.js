const express = require('express');
const router = express.Router();
const pool = require('../database');
const {
    isLoggedIn
} = require('../lib/auth');
const path = require('path');

/* ruta para listar productos(home)*/

router.get('/listado_productos/:id_productos', async (req, res) => {
    const {
        id_productos
    } = req.params;
    const DescripProductos = await pool.query(`SELECT produc.id_productos, produc.nombre, produc.precio, produc.imagen, produc.descripcion, produc.marca, usua.nombre_usuario AS vendedor
    FROM productos produc, usuarios usua
    WHERE produc.id_usuarios = usua.id_usuario AND produc.id_productos = ?`, [id_productos]);
    const ListadoProductosGene = await pool.query(`SELECT produc.id_productos, produc.nombre, produc.precio, produc.imagen
    FROM productos produc`);
    console.log(ListadoProductosGene);
    console.log(DescripProductos[0]);
    res.render('links/producto', {
        DescripProductos: DescripProductos[0],
        ListadoProductosGene: ListadoProductosGene,
    });
});
/* ruta para la descripción de cada producto*/


/* Ruta para traer carrito de compras*/
router.get('/carro_compras', async (req, res) => {
    const carro = req.session.carro;
    let total = 0;
    carro.forEach(producto => {
        producto.total = Number(producto.precio) * Number(producto.cantidad)
        total += producto.total;
    });

    res.render('links/carritocompras', {
        productos: carro,
        total,
        login: req.isAuthenticated()
    });
});


router.get('/carro/procesar', async (req, res) => {


    const carro = req.session.carro;
    if (!carro || carro.lenght < 1) {
        req.flash('message', 'No hay productos en el carrito');
        res.redirect('back');
    } else {
        const pedido = await pool.query(`insert into pedidos set id_usuarios = ${req.user.id_usuario}`);
        let responsePromise;
        let responsePromises = [];
        carro.forEach((producto) => {
            const data = {
                id_pedidos: pedido.insertId,
                id_productos: producto.id_productos,
                precio: producto.precio,
                cantidad: producto.cantidad
            }
            const responsePromise = pool.query('insert into productos_pedidos set ? ', [data]);
            responsePromises.push(responsePromise);
        });

        await Promise.all(responsePromises);
        req.session.carro = [];
        req.flash('success', 'Pedido procesado');
        res.redirect('/home/');
    }

});


router.post('/carro/agregar', async (req, res) => {

    const carro = req.session.carro;
    if (!carro) {

        req.session.carro = [];

    }
    const {
        id_productos,
        precio,
        cantidad,
        nombre
    } = req.body;
    if (req.session.carro.find(producto => producto.id_productos == id_productos)) {
        req.flash('message', 'El producto se encuentra agregado en el carrito');
        res.redirect('back');
    } else {
        const datos = {
            id_productos,
            nombre,
            precio,
            cantidad
        };
        req.session.carro.push(datos);
        req.flash('success', 'Producto agregado al carrito');
        res.redirect('back');

    }



});




router.get('/carro/eliminar/:id_productos', async (req, res) => {

    req.session.carro = req.session.carro.filter(producto => producto.id_productos != req.params.id_productos);
    res.redirect('back');
});



/*Ruta para finalizaar pedido*/

module.exports = router;