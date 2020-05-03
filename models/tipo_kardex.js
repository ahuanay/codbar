const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'tipos_kardex'
};

const TipoKardexSchema = new Schema({
    nombre: { type: String, required: true },
}, schemaOptions);

module.exports = mongoose.model('tipo_kardex', TipoKardexSchema);