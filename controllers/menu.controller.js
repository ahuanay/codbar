const MenuModels = require('../models/menu');

const controller = {};

controller.getAllMenu = async (req, res) => {
    const menuModels = await MenuModels.find();
    res.status(200).json(menuModels);
}

controller.createMenu = async (req, res) => {
    const menuModels = new MenuModels(req.body);
    await menuModels.save();
    res.status(201).json(menuModels); 
}

controller.getByIdMenu = async (req, res) => {
    const menuModels = await MenuModels.findById(req.params.id);
    if(menuModels == null) {
        res.status(404).json({ error : 'El menu no existe' });
        return;
    }
    res.status(200).json(menuModels);
}

controller.putMenu = async (req, res) => {
    const { id } = req.params;
    const menu = {
        nombre: req.body.nombre,
    }
    const menuModels = await MenuModels.findByIdAndUpdate(id, { $set: menu }, { new: true });
    res.status(200).json(menuModels);
}

controller.deleteMenu = async (req, res) => {
    const menuModels = await MenuModels.findByIdAndRemove(req.params.id);
    res.status(200).json(menuModels);
}

module.exports = controller;