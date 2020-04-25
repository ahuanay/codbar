const RolModels = require('../models/rol');

const controller = {};

controller.getAllRol = async (req, res) => {
    const rolModels = await RolModels.find();
    res.status(200).json(rolModels);
}

controller.createRol = async (req, res) => {
    const rolModels = new RolModels(req.body);
    await rolModels.save();
    res.status(201).json(rolModels); 
}

controller.getByIdRol = async (req, res) => {
    const rolModels = await RolModels.findById(req.params.id);
    if(rolModels == null) {
        res.status(404).json({ error : 'El rol no existe' });
        return;
    }
    res.status(200).json(rolModels);
}

controller.getUpdateRol = async (req, res) => {
    const { id } = req.params;
    const rolModel = {
        nombre: req.body.nombre,
    }
    const rolModels = await RolModels.findByIdAndUpdate(id, { $set: rolModel }, { new: true });
    res.status(200).json(rolModels);
}

controller.getDeleteRol = async (req, res) => {
    const rolModels = await RolModels.findByIdAndRemove(req.params.id);
    res.status(200).json(rolModels);
}

module.exports = controller;