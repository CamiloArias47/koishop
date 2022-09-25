describe('Home page open', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000')
    })

    it('is left menu', () => {
        cy.get('.btn-categories')
          .should('have.text', 'Categorias')
    })
})