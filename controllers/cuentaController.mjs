import Cuenta from '../models/Cuenta.mjs';

export const listarCuentas = async (req, res) => {
    try {
        const cuentas = await Cuenta.find();
        res.json(cuentas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const crearCuenta = async (req, res) => {
    const { documentoCliente, claveAcceso } = req.body;
    try {
        const ultimaCuenta = await Cuenta.findOne().sort({ numeroCuenta: -1 });
        const numeroCuenta = ultimaCuenta ? ultimaCuenta.numeroCuenta + 1 : 1;
        const nuevaCuenta = new Cuenta({ numeroCuenta, documentoCliente, claveAcceso });
        await nuevaCuenta.save();
        res.status(201).json(nuevaCuenta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const consignarDinero = async (req, res) => {
    const { numeroCuenta, monto } = req.body;
    if (monto <= 0) {
        return res.status(400).json({ message: 'El monto debe ser positivo' });
    }
    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }
        cuenta.saldo += monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const retirarDinero = async (req, res) => {
    const { numeroCuenta, monto } = req.body;
    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }
        if (monto > cuenta.saldo) {
            return res.status(400).json({ message: 'Saldo insuficiente' });
        }
        cuenta.saldo -= monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const eliminarCuenta = async (req, res) => {
    const { numeroCuenta } = req.body;
    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }
        if (cuenta.saldo !== 0) {
            return res.status(400).json({ message: 'La cuenta debe tener saldo cero para ser eliminada' });
        }
        await cuenta.remove();
        res.json({ message: 'Cuenta eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
