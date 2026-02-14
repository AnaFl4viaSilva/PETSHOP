const API_URL = "/api";
let editId = null;
let editType = '';

// --- CADASTROS ---
async function salvarDono() {
    const nome = document.getElementById('nomeDono').value;
    const telefone = document.getElementById('telefoneDono').value;
    if (!nome || !telefone) return Swal.fire("Aviso", "Preencha todos os campos", "warning");

    const res = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone })
    });

    if (res.ok) {
        document.getElementById('nomeDono').value = "";
        document.getElementById('telefoneDono').value = "";
        carregarDados();
        Swal.fire("Sucesso", "Dono cadastrado!", "success");
    } else {
        const erro = await res.json();
        Swal.fire("Ops!", erro.mensagem, "error");
    }
}

async function salvarPet() {
    const nome = document.getElementById('nomePet').value;
    const especie = document.getElementById('especiePet').value;
    const clienteId = document.getElementById('selectDono').value;
    if (!nome || !clienteId) return Swal.fire("Aviso", "Preencha nome e dono", "warning");

    const res = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, especie, clienteId })
    });

    if (res.ok) {
        document.getElementById('nomePet').value = "";
        carregarDados();
        Swal.fire("Sucesso", "Pet adicionado!", "success");
    } else {
        const erro = await res.json();
        Swal.fire("Erro", erro.mensagem, "error");
    }
}

// --- CARREGAR DADOS ---
async function carregarDados() {
    const resD = await fetch(`${API_URL}/clientes`);
    const donos = await resD.json();
    document.getElementById('selectDono').innerHTML = '<option value="">Dono...</option>' + 
        donos.map(d => `<option value="${d._id}">${d.nome}</option>`).join('');

    document.getElementById('tabelaDonos').innerHTML = donos.map(d => `
        <tr>
            <td>${d.nome}</td>
            <td>${d.telefone}</td>
            <td>
                <button class="btn btn-sm btn-outline-secondary" onclick="abrirEdicaoDono('${d._id}', '${d.nome}', '${d.telefone}')">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletarDono('${d._id}')">Excluir</button>
            </td>
        </tr>
    `).join('');

    const resP = await fetch(`${API_URL}/pets`);
    const pets = await resP.json();
    document.getElementById('tabelaPets').innerHTML = pets.map(p => `
        <tr>
            <td><strong>${p.nome}</strong> (${p.especie})</td>
            <td>${p.clienteId?.nome || 'N/A'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="abrirEdicaoPet('${p._id}', '${p.nome}', '${p.especie}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deletarPet('${p._id}')">X</button>
            </td>
        </tr>
    `).join('');
}

// --- EDIÇÃO ---
const modalUI = new bootstrap.Modal(document.getElementById('modalEdit'));

function abrirEdicaoDono(id, nome, tel) {
    editId = id; editType = 'dono';
    document.getElementById('modalTitulo').innerText = "Editar Dono";
    document.getElementById('modalBody').innerHTML = `<label>Nome:</label><input type="text" id="editNome" class="form-control mb-2" value="${nome}"><label>Telefone:</label><input type="text" id="editTel" class="form-control" value="${tel}">`;
    modalUI.show();
}

function abrirEdicaoPet(id, nome, esp) {
    editId = id; editType = 'pet';
    document.getElementById('modalTitulo').innerText = "Editar Pet";
    document.getElementById('modalBody').innerHTML = `<label>Nome do Pet:</label><input type="text" id="editNome" class="form-control mb-2" value="${nome}"><label>Espécie:</label><select id="editEsp" class="form-select"><option value="Cão" ${esp === 'Cão' ? 'selected' : ''}>Cão</option><option value="Gato" ${esp === 'Gato' ? 'selected' : ''}>Gato</option></select>`;
    modalUI.show();
}

async function confirmarEdicao() {
    const nome = document.getElementById('editNome').value;
    let dados = { nome };
    if (editType === 'dono') dados.telefone = document.getElementById('editTel').value;
    if (editType === 'pet') dados.especie = document.getElementById('editEsp').value;

    await fetch(`${API_URL}/${editType === 'dono' ? 'clientes' : 'pets'}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    modalUI.hide();
    carregarDados();
    Swal.fire("Atualizado", "As alterações foram salvas", "success");
}

// --- EXCLUSÕES ---
async function deletarPet(id) {
    Swal.fire({
        title: 'Excluir Pet?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch(`${API_URL}/pets/${id}`, { method: 'DELETE' });
            carregarDados();
        }
    });
}

async function deletarDono(id) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Isso excluirá o dono e todos os pets dele!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir tudo!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
            carregarDados();
            Swal.fire("Removido", "Os registros foram apagados", "success");
        }
    });
}

// --- API EXTERNA E TIMER ---
async function buscarFotoExterna() {
    const isDog = Math.random() > 0.5;
    const url = isDog ? 'https://dog.ceo/api/breeds/image/random' : 'https://api.thecatapi.com/v1/images/search';
    try {
        const res = await fetch(url);
        const data = await res.json();
        document.getElementById('api-externa-img').src = isDog ? data.message : data[0].url;
    } catch (e) { console.log("Erro API"); }
}


window.onload = () => { 
    carregarDados(); 
    buscarFotoExterna(); 
    setInterval(buscarFotoExterna, 5000); // 5 SEGUNDOS
};