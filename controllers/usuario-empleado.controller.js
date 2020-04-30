const bcrypt = require('bcrypt');
const EmpleadoModels = require('../models/empleado');
const UsuarioModels = require('../models/usuario');

const controller = {};

controller.createUsuarioEmpleado = async (req, res) => {
    const usuario = {
        email: req.body.email,
        password: generateHash(req.body.password),
        avatar_url: req.body.avatar_url,
        estado: req.body.estado,
        rol_id: req.body.rol_id,
    }

    const usuarioModels = new UsuarioModels(usuario);
    await usuarioModels.save();

    const empleado = {
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        nombres: req.body.nombres,
        sexo: req.body.sexo,
        numero_celular: req.body.numero_celular,
        direccion: req.body.direccion,
        usuario_id: usuarioModels._id
    }

    const empleadoModels = new EmpleadoModels(empleado);
    await empleadoModels.save();

    res.status(201).json({ status : 'Empleado guardado' }); 
}

var generateHash = (password) => { return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); };

module.exports = controller;