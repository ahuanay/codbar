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
        res.json({ status : 'El menu no existe' });
        return;
    }
    res.status(200).json(menuModels);
}

controller.getUpdateMenu = async (req, res) => {
    const { id } = req.params;
    const menuModel = {
        nombre: req.body.nombre,
    }
    const menuModels = await MenuModels.findByIdAndUpdate(id, { $set: menuModel }, { new: true });
    res.status(200).json(menuModels);
}

controller.getDeleteMenu = async (req, res) => {
    const menuModel = await MenuModels.findByIdAndRemove(req.params.id);
    res.status(200).json(menuModel);
}

module.exports = controller;