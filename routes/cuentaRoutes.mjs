import express from 'express';
import {
    listarCuentas,
    crearCuenta,
    consignarDinero,
    retirarDinero,
    eliminarCuenta,
} from '../controllers/cuentaController.mjs';

const router = express.Router();

router.get('/cuentas', listarCuentas);
router.post('/cuentas', crearCuenta);
router.post('/cuentas/consignar', consignarDinero);
router.post('/cuentas/retirar', retirarDinero);
router.delete('/cuentas', eliminarCuenta);

export default router;
