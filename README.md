## 🐾PetShop IFPI Manager

Sistema Full Stack desenvolvido para o gerenciamento de uma clínica veterinária/petshop, focado na gestão de proprietários e animais de estimação.

O projeto demonstra a integração completa entre um banco de dados NoSQL, uma API REST robusta com regras de negócio avançadas e uma interface interativa com consumo de serviços externos.

## 🚀 Funcionalidades

👥 Gestão de Clientes (Donos)

Cadastro Inteligente: Registro de proprietários com validação de unicidade (impede duplicados por nome e telefone).

Gerenciamento de Dados: Tabela exclusiva para edição de nomes e contatos.

Exclusão em Cascata: Ao remover um dono, o sistema limpa automaticamente todos os pets vinculados, garantindo a integridade do banco de dados.

🐕 Gestão de Pets

Relacionamento 1:N: Vinculação obrigatória de cada animal a um dono cadastrado.

CRUD Completo: Cadastro, listagem com Join (populate), edição de dados e remoção.

Regra de Unicidade: Impede que um mesmo dono cadastre dois pets com o mesmo nome.

## 🖼️ Galeria Interativa (API Externa)

Integração Híbrida: Consumo das APIs Dog.ceo e TheCatAPI.

Atualização Dinâmica: Troca automática de fotos a cada 5 segundos através de um mecanismo de polling.

## 🛡️ Qualidade e Segurança

Feedbacks Modernos: Uso de SweetAlert2 para substituir alertas nativos por modais profissionais.

Testes Automatizados: Cobertura de testes de ponta a ponta (E2E) com Cypress, validando fluxos de cadastro e erros.

## 🛠️ Tecnologias Utilizadas
Backend (API & Dados)

Node.js: Ambiente de execução Javascript.

Express: Framework para criação da API REST.

MongoDB: Banco de dados NoSQL orientado a documentos.

Mongoose: Modelagem de dados e integridade referencial (ODM).

Cors: Gerenciamento de permissões de acesso entre domínios.

Frontend (Interface)

JavaScript (ES6+): Lógica assíncrona com async/await e Fetch API.

Bootstrap 5: Framework CSS para layout responsivo e componentes.

SweetAlert2: Biblioteca de modais e alertas dinâmicos.

QA (Garantia de Qualidade)

Cypress: Automação de testes para validação de funcionalidades.

## 📦 Como Rodar o Projeto Localmente
Pré-requisitos

Certifique-se de ter instalado:

Node.js

MongoDB Compass (Rodando em localhost:27017)

1. Clonar o Repositório
code
Bash
download
content_copy
expand_less
git clone https://github.com/SEU-USUARIO/petshop-ifpi.git
cd petshop-ifpi
2. Configurar o Backend (Servidor)

Entre na pasta: cd backend

Instalar dependências: npm install

Iniciar o servidor: node server.js

O console exibirá: 🚀 Servidor rodando em: http://localhost:3000

3. Acessar o Sistema

Abra seu navegador em: http://localhost:3000
(O servidor Node está configurado para servir o frontend automaticamente nesta rota).

4. Rodar Testes Automatizados

Em um novo terminal, na raiz do projeto:

Instale o Cypress: npm install cypress --save-dev

Abra a interface de testes: npx cypress open

## 🗂️ Estrutura de Pastas

code

Text

download

content_copy

expand_less

petshop-ifpi/

├── backend/            # API REST (Node.js)

│   ├── server.js       # Ponto de entrada e rotas

│   └── package.json    # Dependências do servidor

├── frontend/           # Interface do Usuário

│   ├── index.html      # Estrutura e layout

│   └── script.js       # Lógica e consumo de API

├── cypress/            # Testes Automatizados (E2E)

│   └── e2e/            # Scripts de teste (.cy.js)

└── package.json        # Dependências de QA

## Integrantes 

Ana Flávia do Nascimento Silva

Gerci Maria da Silva Sales

Jhenifer do Nascimento Costa

Maisa Raquel de Oliveira Pereira

Matheus Diolindo Lima

Rodrigo Freitas Mendes

