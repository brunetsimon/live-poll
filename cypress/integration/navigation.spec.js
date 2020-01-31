/// <reference types="Cypress" />

describe('Navigation', () => {
    it('checks that it is possible to navigate between different pages', () => {
        cy.visit('http://localhost:3000')
        // Homepage is displayed
        cy.contains('ELECTROMOBILITY VOTING APP')
        cy.get('[data-cy=StartVoting]').click()
        // Vote selection is displayed
        cy.contains('Enter the poll ID')
        cy.get('[data-cy=menu]').click()
        cy.get(':nth-child(3) > .MuiButtonBase-root').click()
        // Vote selection is displayed
        cy.contains('Enter poll ID')
        cy.get('[data-cy=admin]').click()
        cy.contains('Login to access the admin dashboard')
    })
})