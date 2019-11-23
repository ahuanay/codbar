const UsuarioModels = require('../models/usuario');

const controller = {};

controller.getAllUsuario = async (req, res) => {
    const resp = await UsuarioModels.find();
    res.json(resp);
}

controller.createUsuario = async (req, res) => {
    const usuarioModels = new UsuarioModels(req.body);
    await usuarioModels.save();
    res.json({ status : 'Usuario guardado' }); 
}

controller.getByIdUsuario = async (req, res) => {
    const usuarioModels = await UsuarioModels.findById(req.params.id);
    if(usuarioModels != null) {
        res.json(usuarioModels);
    } else {
        res.json({ status : 'Usuario no existe' }); 
    }
}

controller.getUpdateUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioModels = {
        nombres: req.body.nombres,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno
    }
    await UsuarioModels.findByIdAndUpdate(id, { $set: usuarioModels }, { new: true });
    res.json({ status: 'Usuario actualizado' });
}

controller.getDeleteEmpleado = async (req, res) => {
    await UsuarioModels.findByIdAndRemove(req.params.id);
    res.json({ status: 'Usuario eliminado' });
}

module.exports = controller;