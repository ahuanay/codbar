const ModeloModels = require('../models/modelo');

const controller = {};

controller.getAllModelo = async (req, res) => {
    const modeloModels = await ModeloModels.find();
    res.status(200).json(modeloModels);
}

controller.getActiveModelo = async (req, res) => {
    var activosModels = [];
    const modeloModels = await ModeloModels.find();
    modeloModels.forEach(e => {
        if(e.estado) {
            activosModels.push(e);
        }
    });
    res.status(200).json(activosModels);
}

controller.createModelo = async (req, res) => {
    res.json(req.file)
    // const modelo = {
    //     nombre: req.body.nombre,
    //     imagen_url: 'http://' + req.headers.host + '/images/producto/'+req.file.filename,
    //     estado: req.body.estado == 'true' ? true : false
    // }
    // const modeloModels = new ModeloModels(modelo);
    // await modeloModels.save();
    // res.status(201).json(modeloModels); 
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
    const modelo = {
        nombre: req.body.nombre,
        imagen_url: req.body.imagen_url,
        estado: req.body.estado
    }
    const modeloModels = await ModeloModels.findByIdAndUpdate(id, { $set: modelo }, { new: true });
    res.status(200).json(modeloModels);
}

controller.deleteModelo = async (req, res) => {
    const modeloModels = await ModeloModels.findByIdAndRemove(req.params.id);
    res.status(200).json(modeloModels);
}

module.exports = controller;