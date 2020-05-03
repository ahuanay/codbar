const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'roles'
};

const RolSchema = new Schema({
    nombre: { type: String, required: true },
}, schemaOptions);

module.exports = mongoose.model('role', RolSchema);