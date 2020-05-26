const express = require ('express');
const router = express.Router();
const pool = require('../../database');

/*router.get('/', (req,res)=>{
    res.render('links/admin/home', {layout: "main_admin"});
});*/

router.get('/',(req,res)=>{
    res.render('links/admin/home',{layout: "main_admin"});
});

/*Método listar usuarios*/ 

router.get('/usuarios', async(req,res)=>{
    const usuarios = await pool.query(`SELECT usua.id_usuario, usua.nombre_usuario, usua.email, rol.rol
    FROM usuarios usua, roles rol
    WHERE rol.id_rol = usua.id_rol`);
    res.render('links/admin/usuarios',{layout: "main_admin", usuarios: usuarios});
});

/*Método para agregar un usuario*/
router.post('/agregar', async(req,res)=>{
    const addUsuarios = req.body;
    await pool.query(`INSERT INTO usuarios set ?`, [addUsuarios]);
    res.redirect('back');
});

/*Método para editar usuarios*/

router.post('/editar/:id_usuario', async(req,res)=>{
    const {id_usuario} = req.params;
    const updateUsua = req.body;
    await pool.query ('UPDATE usuarios set ? WHERE id_usuario = ?', [updateUsua, id_usuario]);
    console.log(updateUsua);
    res.redirect('back');

});

/*Método para eliminar usuarios*/
router.get('/eliminar/:id_usuario', async(req,res)=>{
    const {id_usuario} = req.params;
    await pool.query(`delete from usuarios WHERE id_usuario = ?`, [id_usuario]);
    res.redirect('back');
});

module.exports = router;