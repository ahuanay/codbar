const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'tipos_cuero'
};

const TipoCueroSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: Boolean, required: true }
}, schemaOptions);

module.exports = mongoose.model('tipo_cuero', TipoCueroSchema);