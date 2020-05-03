const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'usuarios'
};

const UsuarioSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar_url: { type: String, required: true },
    estado: { type: Boolean, required: true },
    rol_id: { type: Schema.Types.ObjectId, ref: 'rol' },
}, schemaOptions);

module.exports = mongoose.model('usuario', UsuarioSchema);