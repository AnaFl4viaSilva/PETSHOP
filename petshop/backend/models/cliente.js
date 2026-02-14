const mongoose = require('mongoose');

// Definindo o esquema do Cliente (Dono)
const ClienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    telefone: { type: String, required: true }
});

module.exports = mongoose.model('Cliente', ClienteSchema);