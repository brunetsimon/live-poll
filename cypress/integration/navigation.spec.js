/// <reference types="Cypress" />

describe('Navigation', () => {
    it('checks that it is possible to navigate between different pages', () => {
        cy.visit('http://localhost:3000')
        cy.contains('ELECTROMOBILITY VOTING APP')
    })
})