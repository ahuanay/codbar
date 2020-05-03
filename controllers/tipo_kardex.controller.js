const TipoKardexModels = require('../models/tipo_kardex');

const controller = {};

controller.getAllTipoKardex = async (req, res) => {
    const tipoKardexModels = await TipoKardexModels.find();
    res.status(200).json(tipoKardexModels);
}

controller.createTipoKardex = async (req, res) => {
    const tipoKardexModels = new TipoKardexModels(req.body);
    await tipoKardexModels.save();
    res.status(201).json(tipoKardexModels); 
}

controller.getByIdTipoKardex = async (req, res) => {
    const tipoKardexModels = await TipoKardexModels.findById(req.params.id);
    if(tipoKardexModels == null) {
        res.json({ error : 'El tipo kardex no existe' });
        return;
    }
    res.status(200).json(tipoKardexModels);
}

controller.putTipoKardex = async (req, res) => {
    const { id } = req.params;
    const tipoKardexModel = {
        nombre: req.body.nombre,
    }
    const tipoKardexModels = await TipoKardexModels.findByIdAndUpdate(id, { $set: tipoKardexModel }, { new: true });
    res.status(200).json(tipoKardexModels);
}

controller.deleteTipoKardex = async (req, res) => {
    const tipoKardexModels = await TipoKardexModels.findByIdAndRemove(req.params.id);
    res.status(200).json(tipoKardexModels);
}

module.exports = controller;