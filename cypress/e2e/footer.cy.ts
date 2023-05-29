describe('Footer tests', () => {
    it('displays the footer', () => {
      cy.visit('/')
      cy.get('footer').should('be.visible')
      cy.get('footer').contains('Footer')
    })
  })