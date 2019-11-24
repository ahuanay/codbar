const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nombre: { type: String, required: true },
    codBar: { type: String, required: true },
    imagenUrl: { type: String, required: true },
    precio: { type: Number, default: 0, required: true },
    cantidad: { type: Number, default: 1, required: true },
});

module.exports = mongoose.model('producto', ProductoSchema);