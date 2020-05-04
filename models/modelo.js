const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'modelos'
};

const ModeloSchema = new Schema({
    nombre: { type: String, required: true },
    imagen_url: { type: String, required: true },
    estado: { type: Boolean, required: true }
}, schemaOptions);

module.exports = mongoose.model('modelo', ModeloSchema);