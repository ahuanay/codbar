const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'productos_talla'
};

const ProductoTallaSchema = new Schema({
    talla: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    producto_id: { type: Schema.Types.ObjectId, ref: 'producto' },
}, schemaOptions);

module.exports = mongoose.model('producto_talla', ProductoTallaSchema);