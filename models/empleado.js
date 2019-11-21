const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpleadoSchema = new Schema({
    dni: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    nombres: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
});

module.exports = mongoose.model('empleado', EmpleadoSchema);