
describe('Add product to cart and go to buy', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000')

        cy.clearLocalStorage()

        //Delete user, category and products 
        cy.request('DELETE', 'http://localhost:3000/api/testing')

        //Create user, category and products
        cy.request('POST', 'http://localhost:3000/api/testing')
    })

    it('Show buy Wompy Modal', () => {
        cy.wait(2000)
        
        cy.get('.products-section').scrollIntoView()
          .should('be.visible')

        cy.get('.cards-grid .product-card').first().click()

        //seleccionar color agregar color 
        //cy.get('.form-add__top button').first().click()
        cy.get('.form-add__bottom button').click()
        cy.get('.cart-container .btn-primary').click()
        cy.wait(2000)

        cy.get('.login-container #mail')
          .type('testuser@copitto.com').should('have.value', 'testuser@copitto.com')

        cy.get('.login-container #password')
          .type('secretPassword').should('have.value', 'secretPassword')

        cy.get('.login-container .btn-primary').click()
        cy.wait(2000)

        cy.contains('Testing Product name')
        cy.get('.btn-buy').click()
        
        cy.get('#nombres').should('have.value', 'John Doe')
        cy.get('#cedula').type('12345677')
        cy.get('#telefono').type('3991111111') 
        cy.get('#departamento').select('Valle del Cauca')
        cy.wait(1000)
        cy.get('#ciudad').select('Cali')
        cy.get('#direccion').type('avenida siempre viva 123')   
        cy.get('#direccioncomplemento').type('Casa cafesita')   
        cy.get('#barrio').type('Sprinfield')   
        cy.get('#referenciaDireccion').type('vecino Flanders') 
        cy.get('.btn-buy').click() 
        cy.wait(2000) 

        cy.get('.btn-buy').click()
        cy.wait(4000)

        cy.get('.waybox-iframe').should('be.visible')
    }) 

})