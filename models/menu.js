const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuSchema = new Schema({
    nombre: { type: String, required: true },
});

module.exports = mongoose.model('menus', MenuSchema);