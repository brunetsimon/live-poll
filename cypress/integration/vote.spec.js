
/// <reference types="Cypress" />

let previousTotal = 0;

describe('Select vote', () => {
    it('checks that it is possible to select a vote', () => {
        cy.visit('http://localhost:3000')
        cy.get('[data-cy=StartVoting]').click()
        // Vote selection is displayed
        cy.contains('Enter the poll ID')
        // Enter the ID for our test poll and submit
        cy.get('form')
            .find('[type="text"]').type('CypressTest')
        cy.get('form').submit()
        cy.wait(3000)
        // Check that we reach the poll page
        cy.contains("Poll ID = CypressTest")
    })

    it('checks how many votes on the test vote', () => {
        cy.visit("http://localhost:3000/server/CypressTest")
        cy.wait(1000)
        cy.get('[data-cy=totalLove]').then(($count) => {
            previousTotal = parseInt($count.text())
            cy.log(previousTotal)
        })
    })

    it('checks that it is possible to submit a vote', () => {
        //Submit a vote
        cy.visit("http://localhost:3000/client/CypressTest")
        cy.contains('sentiment_very_satisfied').click()
        cy.contains('Submit').click()
        // Check that the image is displayed correctly
        cy.wait(3000)
        cy.get("[data-cy=image]").should('have.attr', 'src').should('include','0.jpg')
    })

    it('checks that the total has increased after voting', () => {
        cy.visit("http://localhost:3000/server/CypressTest")
        cy.wait(2000)
        cy.get('[data-cy=totalLove]').then(($count) => {
            cy.log(parseInt($count.text()))
            cy.log(previousTotal)
            expect(parseInt($count.text())).to.eq(previousTotal + 1)
        })
    })
})