const ProductoKardexModels = require('../models/productos_kardex');
const ProductoTallaKardexModels = require('../models/productos_talla_kardex');

const controller = {};

controller.getAllProductoKardex = async (req, res) => {
    const productoKardexModels = await ProductoKardexModels.find();
    res.status(200).json(productoKardexModels);
}

controller.createProductoKardex = async (req, res) => {

    const producto_kardex = {
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

    const productoKardexModels = new ProductoKardexModels(producto_kardex);
    await productoKardexModels.save();

    const tallas = req.body.tallas;

    for (let i = 0; i < tallas.length; i++) {
        var productos_talla_kardex = {
            talla: tallas[i].talla,
            cantidad: tallas[i].cantidad,
            producto_kardex_id: productoKardexModels._id
        }
    
        var productoTallaKardexModels = new ProductoTallaKardexModels(productos_talla_kardex);
        await productoTallaKardexModels.save();
    }

    res.status(201).json(productoKardexModels); 
}

controller.getByIdProductoKardex = async (req, res) => {
    const productoKardexModels = await ProductoKardexModels.findById(req.params.id);
    if(productoKardexModels == null) {
        res.json({ error : 'El producto kardex no existe' });
        return;
    }
    res.status(200).json(productoKardexModels);
}

controller.putProductoKardex = async (req, res) => {
    const { id } = req.params;
    const productoKardexModel = {
        nombre: req.body.nombre,
    }
    const productoKardexModels = await ProductoKardexModels.findByIdAndUpdate(id, { $set: productoKardexModel }, { new: true });
    res.status(200).json(productoKardexModels);
}

controller.deleteProductoKardex = async (req, res) => {
    const productoKardexModels = await ProductoKardexModels.findByIdAndRemove(req.params.id);
    res.status(200).json(productoKardexModels);
}

module.exports = controller;