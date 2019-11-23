const EmpleadoModels = require('../models/empleado');

const controller = {};

controller.getAllEmpleado = async (req, res) => {
    const resp = await EmpleadoModels.find();
    res.json(resp);
}

controller.createEmpleado = async (req, res) => {
    const empleadoModels = new EmpleadoModels(req.body);
    await empleadoModels.save();
    res.json({ status : 'Empleado guardado' }); 
}

controller.getByIdEmpleado = async (req, res) => {
    const empleadoModels = await EmpleadoModels.findById(req.params.id);
    if(empleadoModels != null) {
        res.json(empleadoModels);
    } else {
        res.json({ status : 'Empleado no existe' }); 
    }
}

controller.getUpdateEmpleado = async (req, res) => {
    const { id } = req.params;
    const empleadoModels = {
        nombres: req.body.nombres,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno
    }
    await EmpleadoModels.findByIdAndUpdate(id, { $set: empleadoModels }, { new: true });
    res.json({ status: 'Empleado actualizado' });
}

controller.getDeleteEmpleado = async (req, res) => {
    await EmpleadoModels.findByIdAndRemove(req.params.id);
    res.json({ status: 'Empleado eliminado' });
}

module.exports = controller;