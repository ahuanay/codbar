const ProductoModels = require('../models/producto');

const controller = {};

controller.getAllProducto = async (req, res) => {
    const productoModels = await ProductoModels.find();
    res.json(productoModels);
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

controller.getByCodBarProducto = async (req, res) => {
    const productoModels = await ProductoModels.find({ codBar: req.params.codbar }).exec();
    if(productoModels != null) {
        const id = productoModels[0]._id;
        const producto = {
            nombre: productoModels[0].nombre,
            codBar: productoModels[0].codBar,
            imagenUrl: productoModels[0].imagenUrl,
            precio: productoModels[0].precio,
            cantidad: productoModels[0].cantidad  + 1,
        } 
        await ProductoModels.findByIdAndUpdate(id, { $set: producto });
        res.json({ status : 'Producto registrado' }); 
    } else {
        res.json({ status : 'Producto no existe' }); 
    }
}

controller.getUpdateProducto = async (req, res) => {
    const { id } = req.params;
    const productoModels = {
        nombre: req.body.nombre,
        codBar: req.body.codBar,
        imagenUrl: req.body.imagenUrl,
        precio: req.body.precio,
        cantidad: req.body.cantidad
    }
    await ProductoModels.findByIdAndUpdate(id, { $set: productoModels }, { new: true });
    res.json({ status: 'Producto actualizado' });
}

controller.getDeleteProducto = async (req, res) => {
    await ProductoModels.findByIdAndRemove(req.params.id);
    res.json({ status: 'Producto eliminado' });
}

module.exports = controller;