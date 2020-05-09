const ModeloModels = require('../models/modelo');
var fs = require('fs'); 
const controller = {};

controller.getAllModelo = async (req, res) => {
    const modeloModels = await ModeloModels.find();
    res.status(200).json(modeloModels);
}

controller.getActiveModelo = async (req, res) => {
    const modeloModels = await ModeloModels.where('estado', true);
    res.status(200).json(modeloModels);
}

controller.createModelo = async (req, res) => {
    const modelo = {
        nombre: req.body.nombre,
        imagen_url: 'images/producto/'+req.file.filename,
        estado: req.body.estado == 'true' ? true : false
    }
    const modeloModels = new ModeloModels(modelo);
    await modeloModels.save();
    res.status(201).json(modeloModels); 
}

controller.getByIdModelo = async (req, res) => {
    const modeloModels = await ModeloModels.findById(req.params.id);
    if(modeloModels == null) {
        res.status(404).json({ error : 'El modelo no existe' });
        return;
    }
    res.status(200).json(modeloModels);
}

controller.putModelo = async (req, res) => {
    const { id } = req.params;
    const modeloModelsById = await ModeloModels.findById(id);
    var file = null;

    if(req.file == null){
        file = null;
    } else {
        fs.unlinkSync(modeloModelsById.imagen_url);
        file = req.file;
    }

    const modelo = {
        nombre: req.body.nombre,
        imagen_url: file == null ? modeloModels.imagen_url : 'images/producto/'+req.file.filename,
        estado: req.body.estado == 'true' ? true : false
    }

    const modeloModels = await ModeloModels.findByIdAndUpdate(id, { $set: modelo }, { new: true });
    res.status(200).json(modeloModels);
}

controller.deleteModelo = async (req, res) => {
    const modeloModelsById = await ModeloModels.findById(req.params.id);
    fs.unlinkSync(modeloModelsById.imagen_url);
    const modeloModels = await ModeloModels.findByIdAndRemove(req.params.id);
    res.status(200).json(modeloModels);
}

module.exports = controller;