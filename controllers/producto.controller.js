const ProductoModels = require('../models/producto');
const ProductoTallaModels = require('../models/producto_talla');
const ModeloModels = require('../models/modelo');
const TipoCueroModels = require('../models/tipo_cuero');
const ColorModels = require('../models/color');
const CategoriaModels = require('../models/categoria');

const controller = {};

controller.getAllProducto = async (req, res) => {
    const productoModels = await ProductoModels.find();
    res.status(200).json(productoModels);
}

controller.getByIdTiendaProducto = async (req, res) => {
    var response = [];
    const productoTallaModels = await ProductoTallaModels.find();
    for (let i = 0; i < productoTallaModels.length; i++) {
        const productoModels = await ProductoModels.findById(productoTallaModels[i].producto_id).where('tienda_id', req.params.tienda_id);
        if(productoModels != null) {
            const modeloModels = await ModeloModels.findById(productoModels.modelo_id);
            const tipoCueroModels = await TipoCueroModels.findById(productoModels.tipo_cuero_id);
            const colorModels = await ColorModels.findById(productoModels.color_id);
            const categoriaModels = await CategoriaModels.findById(productoModels.categoria_id);
            response.push({
                producto_talla_id: productoTallaModels[i]._id,
                precio: productoModels.precio,
                modelo: modeloModels.nombre,
                tipo_cuero: tipoCueroModels.nombre,
                color: colorModels.nombre,
                categoria: categoriaModels.nombre,
                tallas: productoTallaModels[i].talla,
                cantidad: productoTallaModels[i].cantidad
            })
        }
        
    }
    res.status(200).json(response);
}

controller.getByIdProductoTallaProducto = async (req, res) => {
    const productoTallaModels = await ProductoTallaModels.findById(req.params.producto_talla_id);
    const productoModels = await ProductoModels.findById(productoTallaModels.producto_id);
    var respose = {
        producto_talla_id: productoTallaModels._id,
        modelo_id: productoModels.modelo_id,
        categoria_id: productoModels.categoria_id,
        tipo_cuero_id: productoModels.tipo_cuero_id,
        color_id: productoModels.color_id,
        precio: productoModels.precio,
        tallas: productoTallaModels.talla,
        cantidad: productoTallaModels.cantidad,
    }
    res.status(200).json(respose);
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

controller.getPrecioProducto = async (req, res) => {
    const search = {
        modelo_id: req.query.modelo_id,
        categoria_id: req.query.categoria_id,
        tipo_cuero_id: req.query.tipo_cuero_id,
        color_id: req.query.color_id,
        tienda_id: req.query.tienda_id
    }
    try {
        const productoModels = await ProductoModels.findOne(search);
        res.status(200).json({ precio: productoModels.precio })
    } catch (e) {
        var error = {
            message: 'Error. El id no existe',
            path: e.path,
            value: e.value,
        }
        res.status(500).json(error);
    }
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