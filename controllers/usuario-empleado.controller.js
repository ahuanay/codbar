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
        email: req.body.email,
        user_name: req.body.user_name,
        user_pass: req.body.user_pass,
        avatar: req.body.avatar,
        estado: req.body.estado,
        empleado_id: empleadoModels._id
    }
    
    const usuarioModels = new UsuarioModels(usuario);
    await usuarioModels.save();
    res.json({ status : 'Empleado guardado' }); 
}

module.exports = controller;