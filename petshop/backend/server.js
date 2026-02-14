const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Conexão Local com MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/projeto_petshop_novo')
  .then(() => console.log("✅ MongoDB Conectado!"))
  .catch(err => console.log("❌ Erro no MongoDB:", err));

// Modelos
const Cliente = mongoose.model('Cliente', { nome: String, telefone: String });
const Pet = mongoose.model('Pet', { 
    nome: String, 
    especie: String, 
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' } 
});

// --- ROTAS CLIENTES ---
app.get('/api/clientes', async (req, res) => res.json(await Cliente.find()));

app.post('/api/clientes', async (req, res) => {
    const nome = req.body.nome.trim();
    const telefone = req.body.telefone.trim();

    // Validação: Ignora maiúsculas/minúsculas e espaços extras
    const jaExiste = await Cliente.findOne({ 
        nome: { $regex: new RegExp(`^${nome}$`, 'i') }, 
        telefone: telefone 
    });

    if (jaExiste) return res.status(400).json({ mensagem: "Este dono com este telefone já está cadastrado!" });
    
    res.json(await Cliente.create({ nome, telefone }));
});

app.put('/api/clientes/:id', async (req, res) => {
    await Cliente.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensagem: "Dono atualizado" });
});

app.delete('/api/clientes/:id', async (req, res) => {
    await Pet.deleteMany({ clienteId: req.params.id });
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Dono e pets removidos" });
});

// --- ROTAS PETS ---
app.get('/api/pets', async (req, res) => res.json(await Pet.find().populate('clienteId')));

app.post('/api/pets', async (req, res) => {
    const nome = req.body.nome.trim();
    const { especie, clienteId } = req.body;

    const jaExiste = await Pet.findOne({ 
        nome: { $regex: new RegExp(`^${nome}$`, 'i') }, 
        clienteId: clienteId 
    });

    if (jaExiste) return res.status(400).json({ mensagem: "Este dono já possui um pet com este nome!" });

    res.json(await Pet.create({ nome, especie, clienteId }));
});

app.put('/api/pets/:id', async (req, res) => {
    await Pet.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensagem: "Pet atualizado" });
});

app.delete('/api/pets/:id', async (req, res) => {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Excluído" });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../frontend/index.html')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});