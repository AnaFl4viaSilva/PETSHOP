const Cliente = require('../models/cliente');
const Pet = require('../models/pet'); // Importamos o modelo Pet para validação

// --- CREATE: Cadastrar um novo Cliente/Dono ---
exports.create = async (req, res) => {
    try {
        const { nome, telefone } = req.body;

        // Validação básica
        if (!nome || !telefone) {
            return res.status(400).json({ erro: "Nome e telefone são obrigatórios." });
        }

        const novoCliente = await Cliente.create({ nome, telefone });
        res.status(201).json(novoCliente);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao cadastrar o dono." });
    }
};

// --- READ: Listar todos os Clientes ---
exports.getAll = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar a lista de donos." });
    }
};

// --- UPDATE: Editar os dados de um Cliente ---
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, telefone } = req.body;

        const clienteAtualizado = await Cliente.findByIdAndUpdate(
            id, 
            { nome, telefone }, 
            { new: true } // Retorna o objeto já com os dados novos
        );

        if (!clienteAtualizado) {
            return res.status(404).json({ erro: "Dono não encontrado." });
        }

        res.json(clienteAtualizado);
    } catch (err) {
        res.status(400).json({ erro: "Erro ao atualizar dados." });
    }
};

// --- DELETE: Remover um Cliente ---
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // REGRA DE NEGÓCIO: Verificar se o dono tem pets cadastrados
        // Isso evita que fiquem "pets órfãos" no banco de dados.
        const temPets = await Pet.findOne({ clienteId: id });

        if (temPets) {
            return res.status(400).json({ 
                erro: "Não é possível remover este dono pois ele possui pets vinculados." 
            });
        }

        const removido = await Cliente.findByIdAndDelete(id);

        if (!removido) {
            return res.status(404).json({ erro: "Dono não encontrado." });
        }

        res.json({ mensagem: "Dono removido com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao remover o dono." });
    }
};