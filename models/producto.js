const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'productos'
};

const ProductoSchema = new Schema({
    precio: { type: Number, required: true },
    modelo_id: { type: Schema.Types.ObjectId, ref: 'modelo' },
    categoria_id: { type: Schema.Types.ObjectId, ref: 'categoria' },
    tipo_cuero_id: { type: Schema.Types.ObjectId, ref: 'tipo_cuero' },
    color_id: { type: Schema.Types.ObjectId, ref: 'color' },
}, schemaOptions);

module.exports = mongoose.model('producto', ProductoSchema);