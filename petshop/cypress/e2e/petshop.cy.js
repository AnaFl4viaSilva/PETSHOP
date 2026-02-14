describe('Testes de Automação - PetShop IFPI', () => {
  
  beforeEach(() => {
    // Abre o site antes de cada teste
    cy.visit('http://localhost:3000') 
  })

  it('Deve cadastrar um dono e depois um pet', () => {
    // Cadastra Dono
    cy.get('#nomeDono').type('Carlos Teste', { force: true })
    cy.get('#telefoneDono').type('86 91234-5678', { force: true })
    cy.get('button').contains('Adicionar Dono').click({ force: true })

    // Fecha o alerta de sucesso
    cy.get('.swal2-confirm').click({ force: true })

    // Cadastra Pet
    cy.get('#nomePet').type('Rex Selenium', { force: true })
    cy.get('#especiePet').select('Cão', { force: true })
    cy.get('#selectDono').select('Carlos Teste', { force: true })
    cy.get('button').contains('Salvar Pet').click({ force: true })

    // Fecha alerta de sucesso do pet
    cy.get('.swal2-confirm').click({ force: true })
    cy.get('#tabelaPets').should('contain', 'Rex Selenium')
  })

  it('Deve barrar cadastro de dono duplicado', () => {
    const nome = 'Dono Repetido'
    const tel = '11 1111-1111'

    // --- PRIMEIRO CADASTRO ---
    cy.get('#nomeDono').type(nome, { force: true })
    cy.get('#telefoneDono').type(tel, { force: true })
    cy.get('button').contains('Adicionar Dono').click({ force: true })

    // Clica no OK do sucesso
    cy.get('.swal2-confirm').click({ force: true })

    // --- SEGUNDA TENTATIVA (mesmos dados) ---
    // O { force: true } resolve o erro de "is being covered by another element"
    cy.get('#nomeDono').type(nome, { force: true })
    cy.get('#telefoneDono').type(tel, { force: true })
    cy.get('button').contains('Adicionar Dono').click({ force: true })

    // Verifica se o alerta de erro apareceu
    cy.get('.swal2-title').should('contain', 'Ops!')
    cy.get('.swal2-confirm').click({ force: true })
  })
})