describe('Home page open', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000')
    })

    it('home elements', () => {
        cy.wait(2000)

        cy.get('.products-section')
          .should('not.be.visible')

        cy.get('.products-section').scrollIntoView()
          .should('be.visible')

        cy.get('.btn-categories')
          .should('have.text', 'Categorias')
        cy.get('.btn-categories', { delay: 200 }).click()

        cy.get('.wraper-info-footer')
        .should('not.be.visible')

      cy.get('.wraper-info-footer').scrollIntoView()
        .should('be.visible')

      cy.get('.contact span')
        .first()
        .should('have.text', 'CONTACTO')
    })
})