/// <reference types="cypress" />

const { wait } = require("@testing-library/react")
const { title } = require("process")

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.viewport('iphone-5')
  })

  it('testing nav-tab', () => {
    cy.get('[data-test-id="books-container"]').should('be.visible')
    cy.get('[data-test-id="wishlist-container"]').should('not.be.visible')
    
    cy.get('.mobile-menu').should('be.visible').click()
    cy.get('[data-test-id="books-container"]').should('not.be.visible')
    cy.get('[data-test-id="wishlist-container"]').should('be.visible')

    debugger;
    cy.get('.mobile-menu').should('be.visible').click()
    cy.get('[data-test-id="books-container"]').should('be.visible')
    cy.get('[data-test-id="wishlist-container"]').should('not.be.visible')

  })

  it('testing nav-tab', () => {
    const serchText = 'Книга'
    cy.get('.mobile [data-test-id="searcher-input"]').should('be.visible').type(`${serchText}{enter}`)
    cy.intercept('GET', '*volumes?*').as('getBooks')
    cy.wait('@getBooks').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.get('.mobile [data-test-id="books-container"]').find('.at-column').should('have.length', 10)
    
   

    cy.get('.mobile [data-test-id="books-container"] .card-row').should('be.visible').eq(3).find('button').should('have.text', '+').click().should('have.text', 'Added')
    cy.get('.mobile [data-test-id="books-container"] .card-row').should('be.visible').eq(3).find('p').then(($el) => {
      const title = $el.text()
     
      cy.get('.mobile-menu').click()
      cy.get('[data-test-id="wishlist-container"]').should('be.visible')
      cy.get('.mobile .wish-list-item').should('have.length', 1).find('.book-title').should('have.text', title)
    })

    cy.get('.mobile-menu').click()
    cy.get('.mobile [data-test-id="searcher-input"]').should('be.visible').type(`{selectall}{backspace}`)
    cy.get('.mobile [data-test-id="books-container"]').find('.at-column').should('have.length', 0)
  })

})
