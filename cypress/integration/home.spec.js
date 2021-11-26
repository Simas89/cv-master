/// <reference types="cypress"/>

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('do a simple test', () => {
    cy.get('[data-cy="home_page"]').should('exist');
  });
});
