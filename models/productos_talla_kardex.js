const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'productos_talla_kardex'
};

const ProductoTallaKardexSchema = new Schema({
    talla: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    producto_kardex_id: { type: Schema.Types.ObjectId, ref: 'producto_kardex' },
}, schemaOptions);

module.exports = mongoose.model('producto_talla_kardex', ProductoTallaKardexSchema);