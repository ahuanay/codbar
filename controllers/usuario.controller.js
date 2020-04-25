const bcrypt = require('bcrypt');
const UsuarioModels = require('../models/usuario');
const EmpleadoModels = require('../models/empleado');
const RolModels = require('../models/rol')

const controller = {};

controller.getAllUsuario = async (req, res) => {
    const usuarioModels = await UsuarioModels.find();
    res.status(200).json(usuarioModels);
}

controller.createUsuario = async (req, res) => {
    const usuarioModels = new UsuarioModels(req.body);
    await usuarioModels.save();
    res.status(201).json(usuarioModels); 
}

controller.getByIdUsuario = async (req, res) => {
    const usuarioModels = await UsuarioModels.findById(req.params.id);
    if(usuarioModels == null) {
        res.json({ status : 'Usuario no existe' });
        return;
    }
    res.json(usuarioModels);
}

controller.getUpdateUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioModel = {
        email: req.body.email,
        avatar: req.body.avatar,
        estado: req.body.estado,
        rol_id: req.body.rol_id,
    }
    const usuarioModels = await UsuarioModels.findByIdAndUpdate(id, { $set: usuarioModel }, { new: true });
    res.status(200).json(usuarioModels);
}

controller.getDeleteUsuario = async (req, res) => {
    const usuarioModels = await UsuarioModels.findByIdAndRemove(req.params.id);
    res.status(200).json(usuarioModels);
}

controller.getLogin = async (req, res) => {
    const usuarioModels = await UsuarioModels.where('email', req.body.email);
    
    if(usuarioModels.length == 0) {
        res.status(404).json({ error: 'El correo es incorrecto'});
        return;
    }
    const existe_usuario = validatePassword(req.body.password, usuarioModels[0].password);

    if(!existe_usuario) {
        res.status(404).json({ error: 'La contraseña es incorrecta'});
        return;
    }

    if(!usuarioModels[0].estado) {
        res.status(404).json({ error: 'El usuario está desabilitado'});
        return;
    }

    const rolModels = await RolModels.findById(usuarioModels[0].rol_id);

    if(rolModels.nombre != 'CLIENTE') {
        const empleadoModels = await EmpleadoModels.where('usuario_id', usuarioModels[0]._id);
        const resp = {
            user_id: usuarioModels[0]._id,
            avatar: usuarioModels[0].avatar,
            email: usuarioModels[0].email,
            tipo_documento: empleadoModels[0].tipo_documento,
            numero_documento: empleadoModels[0].numero_documento,
            apellido_paterno: empleadoModels[0].apellido_paterno,
            apellido_materno: empleadoModels[0].apellido_materno,
            nombres: empleadoModels[0].nombres,
            sexo: empleadoModels[0].sexo,
            numero_celular: empleadoModels[0].numero_celular,
            direccion: empleadoModels[0].direccion,
        }
        res.status(200).json(resp);
    }
}

var generateHash = (password) => { return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); };

var validatePassword = (password, password_registered) => { return bcrypt.compareSync(password, password_registered); };

module.exports = controller;