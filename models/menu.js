const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'menus'
};

const MenuSchema = new Schema({
    nombre: { type: String, required: true },
}, schemaOptions);

module.exports = mongoose.model('menu', MenuSchema);