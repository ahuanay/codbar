const ProductoModels = require('../models/producto');
const ProductoTallaModels = require('../models/producto_talla');

const controller = {};

controller.getAllProducto = async (req, res) => {
    const productoModels = await ProductoModels.find();
    res.status(200).json(productoModels);
}

controller.createProducto = async (req, res) => {

    const producto = {
        precio: req.body.precio,
        fecha: req.body.fecha,
        hora: req.body.hora,
        empleado_id: req.body.empleado_id,
        tipo_kardex_id: req.body.tipo_kardex_id,
        tienda_id: req.body.tienda_id,
        modelo_id: req.body.modelo_id,
        categoria_id: req.body.categoria_id,
        tipo_cuero_id: req.body.tipo_cuero_id,
        color_id: req.body.color_id
    }

    const productoModels = new ProductoModels(producto);
    await productoModels.save();

    const tallas = req.body.tallas;

    for (let i = 0; i < tallas.length; i++) {
        var productos_talla = {
            talla: tallas[i].talla,
            cantidad: tallas[i].cantidad,
            producto_id: productoModels._id
        }
    
        var ProductoTallaModels = new ProductoTallaModels(productos_talla);
        await ProductoTallaModels.save();
    }

    res.status(201).json(productoModels); 
}

controller.getByIdProducto = async (req, res) => {
    const productoModels = await ProductoModels.findById(req.params.id);
    if(productoModels == null) {
        res.status(404).json({ error : 'El producto kardex no existe' });
        return;
    }
    res.status(200).json(productoModels);
}

controller.putProducto = async (req, res) => {
    const { id } = req.params;
    const producto = {
        nombre: req.body.nombre,
    }
    const productoModels = await ProductoModels.findByIdAndUpdate(id, { $set: producto }, { new: false });
    res.status(200).json(productoModels);
}

controller.deleteProducto = async (req, res) => {
    const productoModels = await ProductoModels.findByIdAndRemove(req.params.id);
    res.status(200).json(productoModels);
}

module.exports = controller;