const TiendaModels = require('../models/tienda');

const controller = {};

controller.getAllTienda = async (req, res) => {
    const tiendaModels = await TiendaModels.find();
    res.status(200).json(tiendaModels);
}

controller.getActiveTienda = async (req, res) => {
    var activosModels = [];
    const tiendaModels = await TiendaModels.find();
    tiendaModels.forEach(e => {
        if(e.estado) {
            activosModels.push(e);
        }
    });
    res.status(200).json(activosModels);
}

controller.createTienda = async (req, res) => {
    const tiendaModels = new TiendaModels(req.body);
    await tiendaModels.save();
    res.status(201).json(tiendaModels); 
}

controller.getByIdTienda = async (req, res) => {
    const tiendaModels = await TiendaModels.findById(req.params.id);
    if(tiendaModels == null) {
        res.status(404).json({ error : 'La tienda no existe' });
        return;
    }
    res.status(200).json(tiendaModels);
}

controller.putTienda = async (req, res) => {
    const { id } = req.params;
    const tienda = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        estado: req.body.estado
    }
    const tiendaModels = await TiendaModels.findByIdAndUpdate(id, { $set: tienda }, { new: true });
    res.status(200).json(tiendaModels);
}

controller.deleteTienda = async (req, res) => {
    const tiendaModels = await TiendaModels.findByIdAndRemove(req.params.id);
    res.status(200).json(tiendaModels);
}

module.exports = controller;