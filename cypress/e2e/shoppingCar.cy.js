
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
        cy.wait(4000)
        
        cy.get('.products-section')

        cy.get('.products-section').scrollIntoView().should('be.visible')
        // add a product with color option to shopping cart
        cy.get('.cards-grid .product-card').first().click()
        cy.location('pathname', { timeout: 20000 })
        .should('eq', '/producto/Testing-Product-Color')
        cy.get('.form-add__top > :nth-child(1)').click()
        cy.get('.form-add__bottom button').click()
        cy.get('.slidebar-container .close-btn ').click()
        
        //go to home, to add another product
        cy.get('.logo').click()
        cy.get('.products-section').scrollIntoView().should('be.visible')
        cy.get('.cards-grid .product-card:nth-child(2) > a > .product-card-details').click()
        cy.location('pathname', { timeout: 20000 })
        .should('eq', '/producto/Testing-Product-name')
        cy.get('.form-add__bottom button').click()
        
        //Go to buy
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
        cy.wait(5000)
        
        cy.get('.container-btn-buy > .btn-buy', { timeout: 10000 }).click()
        cy.wait(5000)

        cy.get('.waybox-iframe').should('be.visible')
    }) 

})