const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'empleados'
};

const EmpleadoSchema = new Schema({
    tipo_documento: { type: String, required: true },
    numero_documento: { type: String, required: true },
    apellido_paterno: { type: String, required: true },
    apellido_materno: { type: String, required: true },
    nombres: { type: String, required: true },
    sexo: { type: String, required: true },
    numero_celular: { type: String, required: true },
    direccion: { type: String, required: true },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'usuario' },
}, schemaOptions);

module.exports = mongoose.model('empleado', EmpleadoSchema);