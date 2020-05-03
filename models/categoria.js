const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'categorias'
};

const CategoriaSchema = new Schema({
    nombre: { type: String, required: true },
    tallas: { type: [Number], required: true },
    estado: { type: Boolean, required: true }
}, schemaOptions);

module.exports = mongoose.model('categoria', CategoriaSchema);