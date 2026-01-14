describe('Login Test', () => {
  it('Should login successfully with valid credentials', () => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });
});
it('Should show error message with invalid credentials', () => {
  cy.visit('https://www.saucedemo.com');
  cy.get('#user-name').type('invalid_user');
  cy.get('#password').type('wrong_password');
  cy.get('#login-button').click();

  cy.get('[data-test="error"], .error-message-container')
    .should('be.visible')
    .and('contain', 'Username and password do not match');
});
