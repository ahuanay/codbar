const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    estado: { type: Boolean, required: true },
    empleado_id: { type: Schema.Types.ObjectId, ref: 'empleado' },
});

module.exports = mongoose.model('usuario', UsuarioSchema);