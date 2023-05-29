describe('Header tests', () => {
    it('displays the header', () => {
      cy.visit('/')
      cy.get('header').should('be.visible')
      cy.get('header').contains('Header')
    })
  })