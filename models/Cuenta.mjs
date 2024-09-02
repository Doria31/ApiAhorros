import { Schema, model } from 'mongoose';
import { hash } from 'bcrypt';

const cuentaSchema = new Schema({
    numeroCuenta: { 
        type: Number, 
        unique: true, 
        required: true 
    },
    documentoCliente: { 
        type: String, 
        required: true 
    },
    fechaApertura: { 
        type: Date, 
        default: Date.now 
    },
    saldo: { 
        type: Number, 
        default: 0 
    },
    claveAcceso: { 
        type: String, 
        required: true 
    },
});

cuentaSchema.pre('save', async function (next) {
    if (this.isModified('claveAcceso')) {
        this.claveAcceso = await hash(this.claveAcceso, 10);
    }
    next();
});

const Cuenta = model('Cuenta', cuentaSchema);

export default Cuenta;
