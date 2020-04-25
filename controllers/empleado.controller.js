const EmpleadoModels = require('../models/empleado');

const controller = {};

controller.getAllEmpleado = async (req, res) => {
    const empleadoModels = await EmpleadoModels.find();
    res.status(200).json(empleadoModels);
}

controller.createEmpleado = async (req, res) => {
    const empleadoModels = new EmpleadoModels(req.body);
    await empleadoModels.save();
    res.status(201).json(empleadoModels); 
}

controller.getByIdEmpleado = async (req, res) => {
    const empleadoModels = await EmpleadoModels.findById(req.params.id);
    if(empleadoModels == null) {
        res.json({ status : 'El empleado no existe' });
        return;
    }
    res.status(200).json(empleadoModels);
}

controller.getUpdateEmpleado = async (req, res) => {
    const { id } = req.params;
    const empleadoModel = {
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        nombres: req.body.nombres,
        sexo: req.body.sexo,
        numero_celular: req.body.numero_celular,
        direccion: req.body.direccion,
    }
    const empleadoModels = await EmpleadoModels.findByIdAndUpdate(id, { $set: empleadoModel }, { new: true });
    res.status(200).json(empleadoModels);
}

controller.getDeleteEmpleado = async (req, res) => {
    const empleadoModels = await EmpleadoModels.findByIdAndRemove(req.params.id);
    res.status(200).json(empleadoModels);
}

module.exports = controller;