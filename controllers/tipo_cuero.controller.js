const TipoCueroModels = require('../models/tipo_cuero');

const controller = {};

controller.getAllTipoCuero = async (req, res) => {
    const tipoCueroModels = await TipoCueroModels.find();
    res.status(200).json(tipoCueroModels);
}

controller.getActiveTipoCuero = async (req, res) => {
    var activosModels = [];
    const tipoCueroModels = await TipoCueroModels.find();
    tipoCueroModels.forEach(e => {
        if(e.estado) {
            activosModels.push(e);
        }
    });
    res.status(200).json(activosModels);
}

controller.createTipoCuero = async (req, res) => {
    const tipoCueroModels = new TipoCueroModels(req.body);
    await tipoCueroModels.save();
    res.status(201).json(tipoCueroModels); 
}

controller.getByIdTipoCuero = async (req, res) => {
    const tipoCueroModels = await TipoCueroModels.findById(req.params.id);
    if(tipoCueroModels == null) {
        res.status(404).json({ error : 'El tipo de cuero no existe' });
        return;
    }
    res.status(200).json(tipoCueroModels);
}

controller.putTipoCuero = async (req, res) => {
    const { id } = req.params;
    const tipo_cuero = {
        nombre: req.body.nombre,
        estado: req.body.estado
    }
    const tipoCueroModels = await TipoCueroModels.findByIdAndUpdate(id, { $set: tipo_cuero }, { new: true });
    res.status(200).json(tipoCueroModels);
}

controller.deleteTipoCuero = async (req, res) => {
    const tipoCueroModels = await TipoCueroModels.findByIdAndRemove(req.params.id);
    res.status(200).json(tipoCueroModels);
}

module.exports = controller;