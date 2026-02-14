const Pet = require('../models/pet');

// Criar novo Pet
exports.create = async (req, res) => {
    try {
        const novo = await Pet.create(req.body);
        res.status(201).json(novo);
    } catch (err) {
        res.status(400).json({ erro: "Erro ao cadastrar pet" });
    }
};

// Listar todos os Pets (com dados do Dono)
exports.getAll = async (req, res) => {
    try {
        // O .populate('clienteId') traz o nome do dono, não só o ID
        const lista = await Pet.find().populate('clienteId');
        res.json(lista);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// Deletar Pet
exports.delete = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ mensagem: "Pet removido" });
    } catch (err) {
        res.status(400).json({ erro: "Erro ao remover" });
    }
};