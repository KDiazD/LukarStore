const express = require ('express');
const router = express.Router();
const pool = require('../../database');


router.get('/', async(req,res)=>{
    const categorias = await pool.query(`SELECT * FROM categorias`);

    res.render('links/admin/categorias', {layout: "main_admin", categorias:categorias});
});

/*Método agregar categorías*/

router.post('/agregar', async(req,res)=>{
    const addCategorias = req.body;
    await pool.query(`INSERT INTO categorias set ?`, [addCategorias]);
    res.redirect('back');
});

/*Método para editar cateogorías*/

router.post('/editar/:id_categorias', async(req,res)=>{
    const {id_categorias} = req.params;
    const UpdateCategorias = req.body;
    await pool.query(`UPDATE categorias set ? WHERE id_categorias = ?`, [UpdateCategorias, id_categorias]);
    res.redirect('back');
});

/*Método para eliminar cateogrías*/

router.get('/eliminar/:id_categorias', async(req,res)=>{
    const {id_categorias} = req.params;
    await pool.query(`delete from categorias WHERE id_categorias = ?`, [id_categorias]);
    res.redirect('back');
});

module.exports = router;