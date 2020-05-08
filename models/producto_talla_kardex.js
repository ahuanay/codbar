const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'productos_talla_kardex'
};

const ProductoTallaKardexSchema = new Schema({
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    talla: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    tienda_id: { type: Schema.Types.ObjectId, ref: 'tienda' },
    tienda_destino_id: { type: Schema.Types.ObjectId, ref: 'tienda' },
    empleado_id: { type: Schema.Types.ObjectId, ref: 'empleado' },
    tipo_kardex_id: { type: Schema.Types.ObjectId, ref: 'tipo_kardex' },
    venta: { type: Boolean, required:true },
    producto_kardex_id: { type: Schema.Types.ObjectId, ref: 'producto_kardex' },
}, schemaOptions);

module.exports = mongoose.model('producto_talla_kardex', ProductoTallaKardexSchema);