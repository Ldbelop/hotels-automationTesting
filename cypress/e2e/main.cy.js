describe('Hotels app Frontend testing', () => {
  let requestedCardsNumber;
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://ldbelop.github.io/hotels/')
  })

  it('All the cards loaded correctly', () => {
    cy.request('GET', 'https://6256097e8646add390e01d99.mockapi.io/hotels/reservation/hotels').then((response) =>{
      requestedCardsNumber = response.body.length;
      expect(requestedCardsNumber).to.be.greaterThan(0)
      cy.get(".hotelCard").should("have.length",requestedCardsNumber)
    })
  })

  it('The price filter is applied correctly', () => {
    const getRandomInt = (max, min) => {
      return Math.round((Math.random() * (max - min))+min)
    }

    cy.get(".hotelCard").should("be.visible");

    const selectedValue = getRandomInt(1,4);
    let optionText;
    cy.get("#prices")
      .should("be.visible")
      .select(selectedValue)
      .find(`option[value=${selectedValue}]`)
      .then(() => {
        let comparingText = ""
        for(let i = 1; i <= selectedValue; i++){
          comparingText += "$";
        }
        cy.get(".hotelData__HotelRoomInfo")
          .find(".hotelRoomInfo__HotelPrice")
          .should("contain.text", comparingText)
      })

    
  })
  
  it('Clearing filters works', () => {
    const getRandomInt = (max, min) => {
      return Math.round((Math.random() * (max - min))+min)
    }
    cy.get(".hotelCard").should("be.visible")

    cy.get("#countries")
      .should("be.visible")
      .select("Argentina")

    cy.get("#prices")
      .should("be.visible")
      .select(getRandomInt(1,4))

    cy.get("#sizes")
      .should("be.visible")
      .select("M")

    cy.get("#clear-button")
      .should("be.visible")
      .click()

    cy.get(".hotelCard").should("have.length",requestedCardsNumber)
  })
})
