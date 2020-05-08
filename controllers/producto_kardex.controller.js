const moment = require('moment');

const ProductoKardexModels = require('../models/producto_kardex');
const ProductoTallaKardexModels = require('../models/producto_talla_kardex');
const TipoKardexModels = require('../models/tipo_kardex');
const ProductoModels = require('../models/producto');
const ProductoTallaModels = require('../models/producto_talla');
const ModeloModels = require('../models/modelo');
const TipoCueroModels = require('../models/tipo_cuero');
const ColorModels = require('../models/color');
const CategoriaModels = require('../models/categoria');

const controller = {};

controller.getAllProductoKardex = async (req, res) => {
    const productoKardexModels = await ProductoKardexModels.find();
    res.status(200).json(productoKardexModels);
}

controller.getAllProductoKardexIngreso = async (req, res) => {
    const tipoKardexModels = await TipoKardexModels.findOne({nombre : 'INGRESO'});

    var response = [];
    const productoTallaKardexModels = await ProductoTallaKardexModels.where('tipo_kardex_id', tipoKardexModels._id).where('tienda_id', req.query.tienda_id);
    for (let i = 0; i < productoTallaKardexModels.length; i++) {
        const productoKardexModels = await ProductoKardexModels.findById(productoTallaKardexModels[i].producto_kardex_id)
                                                                .populate('modelo_id')
                                                                .populate('tipo_cuero_id')
                                                                .populate('color_id')
                                                                .populate('categoria_id');
        if(productoKardexModels != null) {
            var fecha_hora = new Date(moment(productoTallaKardexModels[i].fecha).format('YYYY-MM-DD') + ' ' + productoTallaKardexModels[i].hora)
            response.push({
                producto_talla_kardex_id: productoTallaKardexModels[i]._id,
                fecha_hora: moment(fecha_hora).format('DD/MM/YYYY hh:mm A'),
                modelo: productoKardexModels.modelo_id.nombre,
                tipo_cuero: productoKardexModels.tipo_cuero_id.nombre,
                color: productoKardexModels.color_id.nombre,
                categoria: productoKardexModels.categoria_id.nombre,
                tallas: productoTallaKardexModels[i].talla,
                cantidad_ingreso: productoTallaKardexModels[i].cantidad
            })
        }
    }
    res.status(200).json(response);
}

controller.getAllProductoKardexEgreso = async (req, res) => {
    const tipoKardexModels = await TipoKardexModels.findOne({nombre : 'EGRESO'});

    var response = [];
    const productoTallaKardexModels = await ProductoTallaKardexModels.where('tipo_kardex_id', tipoKardexModels._id).where('tienda_id', req.query.tienda_id);
    for (let i = 0; i < productoTallaKardexModels.length; i++) {
        const productoKardexModels = await ProductoKardexModels.findById(productoTallaKardexModels[i].producto_kardex_id)
                                                                .populate('modelo_id')
                                                                .populate('tipo_cuero_id')
                                                                .populate('color_id')
                                                                .populate('categoria_id');
        if(productoKardexModels != null) {
            var fecha_hora = new Date(moment(productoTallaKardexModels[i].fecha).format('YYYY-MM-DD') + ' ' + productoTallaKardexModels[i].hora)
            response.push({
                producto_talla_kardex_id: productoTallaKardexModels[i]._id,
                fecha_hora: moment(fecha_hora).format('DD/MM/YYYY hh:mm A'),
                modelo: productoKardexModels.modelo_id.nombre,
                tipo_cuero: productoKardexModels.tipo_cuero_id.nombre,
                color: productoKardexModels.color_id.nombre,
                categoria: productoKardexModels.categoria_id.nombre,
                tallas: productoTallaKardexModels[i].talla,
                cantidad_ingreso: productoTallaKardexModels[i].cantidad
            })
        }
        
    }
    res.status(200).json(response);
}

controller.createProductoKardexIngreso = async (req, res) => {

    const tipoKardexModels = await TipoKardexModels.findOne({nombre : 'INGRESO'});

    var producto_id, producto_kardex_id;

    const producto_kardex = {
        precio: req.body.precio,
        modelo_id: req.body.modelo_id,
        categoria_id: req.body.categoria_id,
        tipo_cuero_id: req.body.tipo_cuero_id,
        color_id: req.body.color_id
    }

    const productoSearch =  await ProductoModels.findOne({ precio: producto_kardex.precio })
                                        .where('modelo_id', producto_kardex.modelo_id)
                                        .where('categoria_id', producto_kardex.categoria_id)
                                        .where('tipo_cuero_id', producto_kardex.tipo_cuero_id)
                                        .where('color_id', producto_kardex.color_id);

    const productoKardexSearch =  await ProductoKardexModels.findOne({ precio: producto_kardex.precio })
                                        .where('modelo_id', producto_kardex.modelo_id)
                                        .where('categoria_id', producto_kardex.categoria_id)
                                        .where('tipo_cuero_id', producto_kardex.tipo_cuero_id)
                                        .where('color_id', producto_kardex.color_id);

    if(productoSearch == null) {
        const productoKardexModels = new ProductoKardexModels(producto_kardex);
        await productoKardexModels.save();
        const productoModels = new ProductoModels(producto_kardex);
        await productoModels.save();
        producto_id = productoModels._id;
        producto_kardex_id = productoKardexModels._id;
    } else {
        producto_id = productoSearch._id;
        producto_kardex_id = productoKardexSearch._id;
    }

    const tallas = req.body.tallas;

    for (let i = 0; i < tallas.length; i++) {
        var productos_talla_kardex = {
            fecha: req.body.fecha,
            hora: req.body.hora,
            talla: tallas[i].talla,
            cantidad: tallas[i].cantidad,
            tienda_id: req.body.tienda_id,
            empleado_id: req.body.empleado_id,
            tipo_kardex_id: tipoKardexModels._id,
            producto_kardex_id: producto_kardex_id
        }

        if(productoSearch == null) {
            var productos_talla = {
                talla: tallas[i].talla,
                cantidad: tallas[i].cantidad,
                tienda_id: req.body.tienda_id,
                producto_id: producto_id
            }
            const productoTallaModels = new ProductoTallaModels(productos_talla);
            await productoTallaModels.save();

        } else {
            var productoTallaSearch = await ProductoTallaModels.findOne({ producto_id: producto_id })
                                                                .where('talla', tallas[i].talla)
                                                                .where('tienda_id', req.body.tienda_id);
            if(productoTallaSearch == null) {
                var productos_talla = {
                    talla: tallas[i].talla,
                    cantidad: tallas[i].cantidad,
                    tienda_id: req.body.tienda_id,
                    producto_id: producto_id
                }
                const productoTallaModels = new ProductoTallaModels(productos_talla);
                await productoTallaModels.save();
            } else {
                const producto_talla = {
                    cantidad: productoTallaSearch.cantidad + tallas[i].cantidad,
                }
                await ProductoTallaModels.findByIdAndUpdate(productoTallaSearch._id, { $set: producto_talla }, { new: false });
            }
        }
    
        var productoTallaKardexModels = new ProductoTallaKardexModels(productos_talla_kardex);
        await productoTallaKardexModels.save();
    }

    res.status(201).json(producto_kardex); 
}

controller.createProductoKardexEgreso = async (req, res) => {

    const tipoKardexModels = await TipoKardexModels.findOne({nombre : 'EGRESO'});

    const productoTallaModels = await ProductoTallaModels.findById(req.body.producto_talla_id);
    
    const productoModels = await ProductoModels.findById(productoTallaModels.producto_id);

    var producto_kardex_id;
    const producto_kardex = {
        precio: productoModels.precio,
        modelo_id: productoModels.modelo_id,
        categoria_id: productoModels.categoria_id,
        tipo_cuero_id: productoModels.tipo_cuero_id,
        color_id: productoModels.color_id,
    }

    const productoKardexSearch =  await ProductoKardexModels.findOne({ precio: producto_kardex.precio })
                                        .where('modelo_id', producto_kardex.modelo_id)
                                        .where('categoria_id', producto_kardex.categoria_id)
                                        .where('tipo_cuero_id', producto_kardex.tipo_cuero_id)
                                        .where('color_id', producto_kardex.color_id);

    if(productoKardexSearch == null) {
        const productoKardexModels = new ProductoKardexModels(producto_kardex);
        await productoKardexModels.save();
        producto_kardex_id = productoKardexModels._id;
    } else {
        producto_kardex_id = productoKardexSearch._id;
    }    

    const productos_talla_kardex = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        empleado_id: req.body.empleado_id,
        tienda_id: req.body.tienda_id,
        tipo_kardex_id: tipoKardexModels._id, 
        talla: productoTallaModels.talla,
        cantidad: req.body.cantidad,
        producto_kardex_id: producto_kardex_id
    }

    var productoTallaKardexModels = new ProductoTallaKardexModels(productos_talla_kardex);
    await productoTallaKardexModels.save();

    const producto_talla = {
        cantidad: productoTallaModels.cantidad - req.body.cantidad,
    }

    await ProductoTallaModels.findByIdAndUpdate(productoTallaModels._id, { $set: producto_talla }, { new: false });

    res.status(201).json(productoKardexModels); 
}

controller.getByIdProductoKardex = async (req, res) => {
    const productoKardexModels = await ProductoKardexModels.findById(req.params.id);
    if(productoKardexModels == null) {
        res.status(404).json({ error : 'El producto kardex no existe' });
        return;
    }
    res.status(200).json(productoKardexModels);
}

controller.putProductoKardex = async (req, res) => {
    const { id } = req.params;
    const producto_kardex = {
        nombre: req.body.nombre,
    }
    const productoKardexModels = await ProductoKardexModels.findByIdAndUpdate(id, { $set: producto_kardex }, { new: false });
    res.status(200).json(productoKardexModels);
}

controller.deleteProductoKardex = async (req, res) => {
    const productoKardexModels = await ProductoKardexModels.findByIdAndRemove(req.params.id);
    res.status(200).json(productoKardexModels);
}

module.exports = controller;