const ProductoKardexModels = require('../models/producto_kardex');
const ProductoTallaKardexModels = require('../models/producto_talla_kardex');
const TipoKardexModels = require('../models/tipo_kardex');
const ProductoModels = require('../models/producto');
const ProductoTallaModels = require('../models/producto_talla');

const controller = {};

controller.getAllProductoKardex = async (req, res) => {
    const productoKardexModels = await ProductoKardexModels.find();
    res.status(200).json(productoKardexModels);
}

controller.createProductoKardexIngreso = async (req, res) => {

    var producto_id;

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

    const productoSearch =  await ProductoModels.where('precio', producto_kardex.precio)
                                        .where('tienda_id', producto_kardex.tienda_id)
                                        .where('modelo_id', producto_kardex.modelo_id)
                                        .where('categoria_id', producto_kardex.categoria_id)
                                        .where('tipo_cuero_id', producto_kardex.tipo_cuero_id)
                                        .where('color_id', producto_kardex.color_id);

    const productoKardexModels = new ProductoKardexModels(producto_kardex);
    await productoKardexModels.save();

    if(productoSearch.length == 0) {
        const productoModels = new ProductoModels(producto_kardex);
        await productoModels.save();
        producto_id = productoModels._id;
    } else {
        producto_id = productoSearch[0]._id;
    }

    const tallas = req.body.tallas;

    for (let i = 0; i < tallas.length; i++) {
        var productos_talla_kardex = {
            talla: tallas[i].talla,
            cantidad: tallas[i].cantidad,
            producto_kardex_id: productoKardexModels._id
        }

        if(productoSearch.length == 0) {
            var productos_kardex = {
                talla: tallas[i].talla,
                cantidad: tallas[i].cantidad,
                producto_id: producto_id
            }
            const productoTallaModels = new ProductoTallaModels(productos_kardex);
            await productoTallaModels.save();
        } else {
            var productoTallaSearch = await ProductoTallaModels.where('producto_id', producto_id).where('talla', tallas[i].talla);
            if(productoTallaSearch.length == 0) {
                var productos_kardex = {
                    talla: tallas[i].talla,
                    cantidad: tallas[i].cantidad,
                    producto_id: producto_id
                }
                const productoTallaModels = new ProductoTallaModels(productos_kardex);
                await productoTallaModels.save();
            } else {
                const producto_talla = {
                    cantidad: productoTallaSearch[0].cantidad + tallas[i].cantidad,
                }
                await ProductoTallaModels.findByIdAndUpdate(productoTallaSearch[0]._id, { $set: producto_talla }, { new: false });
                await ProductoTallaModels.findAndModify()
            }
        }
    
        var productoTallaKardexModels = new ProductoTallaKardexModels(productos_talla_kardex);
        await productoTallaKardexModels.save();
    }

    res.status(201).json(productoKardexModels); 
}

controller.createProductoKardexEgreso = async (req, res) => {

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

    const productoSearch =  await ProductoModels.where('precio', producto_kardex.precio)
                                        .where('tienda_id', producto_kardex.tienda_id)
                                        .where('modelo_id', producto_kardex.modelo_id)
                                        .where('categoria_id', producto_kardex.categoria_id)
                                        .where('tipo_cuero_id', producto_kardex.tipo_cuero_id)
                                        .where('color_id', producto_kardex.color_id);

    const productoKardexModels = new ProductoKardexModels(producto_kardex);
    await productoKardexModels.save();

    const talla = req.body.talla;

    const productos_talla_kardex = {
        talla: talla.talla,
        cantidad: talla.cantidad,
        producto_kardex_id: productoSearch[0]._id
    }

    const productoTallaSearch = await ProductoTallaModels.where('producto_id', productoSearch[0]._id).where('talla', talla.talla);

    const producto_talla = {
        cantidad: productoTallaSearch[0].cantidad - talla.cantidad,
    }
    await ProductoTallaModels.findByIdAndUpdate(productoTallaSearch[0]._id, { $set: producto_talla }, { new: false });

    var productoTallaKardexModels = new ProductoTallaKardexModels(productos_talla_kardex);
    await productoTallaKardexModels.save();

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