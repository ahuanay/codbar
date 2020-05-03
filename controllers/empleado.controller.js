const bcrypt = require('bcrypt');
const EmpleadoModels = require('../models/empleado');
const UsuarioModels = require('../models/usuario');
const RolModels = require('../models/rol');

const controller = {};

controller.getAllEmpleado = async (req, res) => {
    const empleadoModels = await EmpleadoModels.find();
    res.status(200).json(empleadoModels);
}

controller.createEmpleado = async (req, res) => {
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
    
    res.status(201).json(empleadoModels); 
}

controller.getByIdEmpleado = async (req, res) => {
    // var response = new Object();
    const empleadoModels = await EmpleadoModels.findById(req.params.id);
    if(empleadoModels == null) {
        res.status(404).json({ error : 'El empleado no existe' });
        return;
    }
    const usuarioModels =  await UsuarioModels.findById(empleadoModels.usuario_id);
    const rolModels =  await RolModels.findById(usuarioModels.rol_id);


    var response = {
        _id: empleadoModels._id,
        tipo_documento: empleadoModels.tipo_documento,
        numero_documento: empleadoModels.numero_documento,
        apellido_paterno: empleadoModels.apellido_paterno,
        apellido_materno: empleadoModels.apellido_materno,
        nombres: empleadoModels.nombres,
        sexo: empleadoModels.sexo,
        numero_celular: empleadoModels.numero_celular,
        direccion: empleadoModels.direccion,
        usuario_id: empleadoModels.usuario_id,
        usuario: {
            _id: usuarioModels._id,
            email: usuarioModels.email,
            password: usuarioModels.password,
            avatar_url: usuarioModels.avatar_url,
            estado: usuarioModels.estado,
            rol_id: usuarioModels.rol_id,
            rol: {
                _id: rolModels._id,
                nombre: rolModels.nombre
            }
        }
    }
    
    res.status(200).json(response);
}

controller.putEmpleado = async (req, res) => {
    const { id } = req.params;
    const empleado = {
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        nombres: req.body.nombres,
        sexo: req.body.sexo,
        numero_celular: req.body.numero_celular,
        direccion: req.body.direccion,
    }
    const empleadoModels = await EmpleadoModels.findByIdAndUpdate(id, { $set: empleado }, { new: true });
    res.status(200).json(empleadoModels);
}

controller.deleteEmpleado = async (req, res) => {
    const empleadoModels = await EmpleadoModels.findByIdAndRemove(req.params.id);
    res.status(200).json(empleadoModels);
}

var generateHash = (password) => { return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); };

module.exports = controller;