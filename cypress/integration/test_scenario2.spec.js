let Chance = require('chance')

describe('Test Scenario 2', () => {
  before(() => {
    cy.visit('https://www.lambdatest.com/selenium-playground/')
    cy.injectAxe()
    cy.checkA11y('.sp__main > div > .text-size-18')
  })

  beforeEach(function () {
    cy.viewport('samsung-note9')
  })

  it('Scenario2', () => {
    cy.title().should('contain', 'Selenium Grid Online')
    cy.get('.st_heading:first').should('be.visible').should('have.text', ' Input Forms')
    cy.contains('Input Form Submit').should('be.visible').click()
    cy.get('#seleniumform').scrollIntoView()
  })

  it('Fill form details', function () {
    let username = Chance().name()
    let email = Chance().email()
    let password = Chance().string()
    let company = Chance().company()
    let zipCode = Chance().zip()
    let address = Chance().address({ short_suffix: true })
    let address2 = Chance().address()
    let state = Chance().state()
    let website = Chance().avatar({ protocol: 'https' })
    let city = Chance().city()

    cy.get('#seleniumform').within(() => {
      cy.get('input#name').type(username)
      cy.get('input#inputEmail4').type(email)
      cy.get('input#inputPassword4').type(password)
      cy.get('input#company').type(company)
      cy.get('input#websitename').type(website)
      cy.get('select').select('India').should('have.value', 'IN')
      cy.get('input#inputCity').type(city)
      cy.get('input#inputAddress1').type(address)
      cy.get('input#inputAddress2').type(address2)
      cy.get('input#inputState').type(state)
      cy.get('input#inputZip').type(zipCode)
      cy.get('button').click()
    })

    cy.fixture('config.json').then((configuration) => {
      cy.lighthouse(configuration.threshold, configuration.lighthouseConfig)
    })

    cy.get('.success-msg').should('have.text', 'Thanks for contacting us, we will get back to you shortly.')
    cy.go('back')
  })

  Cypress.session.clearAllSavedSessions()
})
