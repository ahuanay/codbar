const ProductoModels = require('../models/producto');

const controller = {};

controller.getAllProducto = async (req, res) => {
    const resp = await ProductoModels.find();
    res.json(resp);
}

controller.createProducto = async (req, res) => {
    const productoModels = new ProductoModels(req.body);
    await productoModels.save();
    res.json({ status : 'Producto guardado' }); 
}

controller.getByIdProducto = async (req, res) => {
    const productoModels = await ProductoModels.findById(req.params.id);
    if(productoModels != null) {
        res.json(productoModels);
    } else {
        res.json({ status : 'Producto no existe' }); 
    }
}

controller.getUpdateProducto = async (req, res) => {
    const { id } = req.params;
    const productoModels = {
        nombres: req.body.nombres,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno
    }
    await ProductoModels.findByIdAndUpdate(id, { $set: productoModels }, { new: true });
    res.json({ status: 'Producto actualizado' });
}

controller.getDeleteProducto = async (req, res) => {
    await ProductoModels.findByIdAndRemove(req.params.id);
    res.json({ status: 'Producto eliminado' });
}

module.exports = controller;