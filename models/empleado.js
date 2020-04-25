const mongoose = require('mongoose');
const { Schema } = mongoose;

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
});

module.exports = mongoose.model('empleados', EmpleadoSchema);