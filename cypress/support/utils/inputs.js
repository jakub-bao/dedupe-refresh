Cypress.Commands.overwrite('select', (x, subject, value)=>{
    cy.get(subject).click();
    cy.get(`[data-value="${value}"]`).click();
});