const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar_url: { type: String, required: true },
    estado: { type: Boolean, required: true },
    rol_id: { type: Schema.Types.ObjectId, ref: 'rol' },
});

module.exports = mongoose.model('usuarios', UsuarioSchema);