const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'productos_kardex'
};

const ProductoKardexSchema = new Schema({
    precio: { type: Number, required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    empleado_id: { type: Schema.Types.ObjectId, ref: 'empleado' },
    tipo_kardex_id: { type: Schema.Types.ObjectId, ref: 'tipo_kardex' },
    tienda_id: { type: Schema.Types.ObjectId, ref: 'tienda' },
    modelo_id: { type: Schema.Types.ObjectId, ref: 'modelo' },
    categoria_id: { type: Schema.Types.ObjectId, ref: 'categoria' },
    tipo_cuero_id: { type: Schema.Types.ObjectId, ref: 'tipo_cuero' },
    color_id: { type: Schema.Types.ObjectId, ref: 'color' },
}, schemaOptions);

module.exports = mongoose.model('producto_kardex', ProductoKardexSchema);