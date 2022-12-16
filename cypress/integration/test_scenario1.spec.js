describe('Test Scenario 1', () => {
  it('Slider Validation', () => {
    cy.visit('https://www.lambdatest.com/selenium-playground/')
    cy.get('a').contains('Drag & Drop Sliders').click({force:true})
    cy.get('#slider3').contains('Default value 15').should('be.visible')
    cy.get('#slider3 > div >input[type=range]')
            .then(($el) => $el[0].stepUp(80))
            .scrollIntoView()
            .trigger('change')

    cy.xpath('//*[@id="rangeSuccess"]').should('have.value', 95)
    cy.go('back')
  })
})
