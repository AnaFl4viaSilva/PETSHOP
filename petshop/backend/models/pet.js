const mongoose = require('mongoose');

// Definindo o esquema do Pet e relacionando com o Cliente
const PetSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    especie: { type: String, required: true }, // Ex: Cão, Gato
    clienteId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cliente', // Aqui criamos o vínculo (chave estrangeira)
        required: true 
    }
});

module.exports = mongoose.model('Pet', PetSchema);