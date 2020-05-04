const CategoriaModels = require('../models/categoria');

const controller = {};

controller.getAllCategoria = async (req, res) => {
    const categoriaModels = await CategoriaModels.find();
    res.status(200).json(categoriaModels);
}

controller.createCategoria = async (req, res) => {
    const categoriaModels = new CategoriaModels(req.body);
    await categoriaModels.save();
    res.status(201).json(categoriaModels); 
}

controller.getByIdCategoria = async (req, res) => {
    const categoriaModels = await CategoriaModels.findById(req.params.id);
    if(categoriaModels == null) {
        res.status(404).json({ error : 'El categoría no existe' });
        return;
    }
    res.status(200).json(categoriaModels);
}

controller.putCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = {
        nombre: req.body.nombre,
        tallas: req.body.tallas,
        estado: req.body.estado
    }
    const categoriaModels = await CategoriaModels.findByIdAndUpdate(id, { $set: categoria }, { new: true });
    res.status(200).json(categoriaModels);
}

controller.deleteCategoria = async (req, res) => {
    const categoriaModels = await CategoriaModels.findByIdAndRemove(req.params.id);
    res.status(200).json(categoriaModels);
}

module.exports = controller;