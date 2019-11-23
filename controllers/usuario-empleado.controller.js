const EmpleadoModels = require('../models/empleado');
const UsuarioModels = require('../models/usuario');

const controller = {};

controller.getAllUsuarioEmpleado = async (req, res) => {
    const resp = await EmpleadoModels.find();
    res.json(resp);
}

controller.createUsuarioEmpleado = async (req, res) => {
    const empleadoModels = new EmpleadoModels(req.body);
    await empleadoModels.save();

    const usuario = {
        userName: req.body.nombres,
        userPass: req.body.nombres,
        rol: req.body.nombres,
        idEmpleado: empleadoModels._id
    }
    
    const usuarioModels = new UsuarioModels(usuario);
    await usuarioModels.save();
    res.json({ status : 'Empleado guardado' }); 
}

module.exports = controller;