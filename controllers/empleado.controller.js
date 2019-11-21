const Models = require('../models/empleado');

const controller = {};

controller.getAllEmpleado = async (req, res) => {
    const resp = await Models.find();
    res.json(resp);
}

controller.createEmpleado = async (req, res) => {
    const models = new Models(req.body);
    await models.save();
    res.json({ status : 'Empleado guardado' }); 
}

controller.getByIdEmpleado = async (req, res) => {
    const models = await Models.findById(req.params.id);
    if(models != null) {
        res.json(models);
    } else {
        res.json({ status : 'Empleado no existe' }); 
    }
    
}

controller.getUpdateEmpleado = async (req, res) => {
    const { id } = req.params;
    const models = {
        nombres: req.body.nombres,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno
    }
    await Models.findByIdAndUpdate(id, { $set: models }, { new: true });
    res.json({ status: 'Empleado actualizado' });
}

controller.getDeleteEmpleado = async (req, res) => {
    await Models.findByIdAndRemove(req.params.id);
    res.json({ status: 'Empleado eliminado' });
}

module.exports = controller;