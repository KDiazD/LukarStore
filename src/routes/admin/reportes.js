const express = require ('express');
const router = express.Router();
const pool = require('../../database');


router.get('/grafica', async(req,res)=>{


    const DatosReportes = await pool.query(`SELECT DAY(pe.fecha) AS dia, SUM(pp.precio * pp.cantidad) AS total_venta
    FROM productos produc, pedidos pe, productos_pedidos pp
    WHERE pp.id_pedidos = pe.id_pedidos AND produc.id_productos = pp.id_productos AND  MONTH(pe.fecha) = MONTH(NOW()) GROUP BY dia`);
    const ListaDias = await pool.query(`SELECT DAY(LAST_DAY(NOW())) AS dia`);
    const dia =[];
    const reportes =[];


    for(i = 1; i <= ListaDias[0].dia; i++){
        dia.push(i);
        const filtro = DatosReportes.find((registro) => registro.dia == i);
        reportes.push(filtro && filtro.total_venta ? filtro.total_venta : 0);

    }
    
    res.json({
        reportes,
        dia
    });
    

});

module.exports = router;