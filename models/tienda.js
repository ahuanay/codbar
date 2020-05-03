const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'tiendas'
};

const TiendaSchema = new Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    estado: { type: Boolean, required: true }
}, schemaOptions);

module.exports = mongoose.model('tienda', TiendaSchema);