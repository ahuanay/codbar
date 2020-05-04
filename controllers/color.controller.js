const ColorModels = require('../models/color');

const controller = {};

controller.getAllColor = async (req, res) => {
    const colorModels = await ColorModels.find();
    res.status(200).json(colorModels);
}

controller.getActiveColor = async (req, res) => {
    var activosModels = [];
    const colorModels = await ColorModels.find();
    colorModels.forEach(e => {
        if(e.estado) {
            activosModels.push(e);
        }
    });
    res.status(200).json(activosModels);
}

controller.createColor = async (req, res) => {
    const colorModels = new ColorModels(req.body);
    await colorModels.save();
    res.status(201).json(colorModels); 
}

controller.getByIdColor = async (req, res) => {
    const colorModels = await ColorModels.findById(req.params.id);
    if(colorModels == null) {
        res.status(404).json({ error : 'El color no existe' });
        return;
    }
    res.status(200).json(colorModels);
}

controller.putColor = async (req, res) => {
    const { id } = req.params;
    const color = {
        nombre: req.body.nombre,
        estado: req.body.estado
    }
    const colorModels = await ColorModels.findByIdAndUpdate(id, { $set: color }, { new: true });
    res.status(200).json(colorModels);
}

controller.deleteColor = async (req, res) => {
    const colorModels = await ColorModels.findByIdAndRemove(req.params.id);
    res.status(200).json(colorModels);
}

module.exports = controller;