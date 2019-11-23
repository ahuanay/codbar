const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    userName: { type: String, required: true },
    userPass: { type: String, required: true },
    rol: { type: String, required: true },
    idEmpleado: { type: Schema.Types.ObjectId, ref: 'empleado' },
});

module.exports = mongoose.model('usuario', UsuarioSchema);