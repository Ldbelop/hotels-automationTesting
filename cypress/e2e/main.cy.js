describe('template spec', () => {
  let requestedCardsNumber;
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://ldbelop.github.io/hotels/')
  })
  it('All the cards loaded correctly', () => {
    cy.request('GET', 'https://6256097e8646add390e01d99.mockapi.io/hotels/reservation/hotels').then((response) =>{
      requestedCardsNumber = response.body.length;
      expect(response.body.length).to.be.greaterThan(0)
      cy.get(".hotelCard").should("have.length",requestedCardsNumber)
    })
  })
  it('The price filter is applied correctly', () => {
    const getRandomInt = (max, min) => {
      return Math.round((Math.random() * (max - min))+min)
    }
    cy.get(".hotelCard").should("be.visible")
    cy.get("#prices")
      .should("be.visible")
      .select(getRandomInt(1,4))
  })
})