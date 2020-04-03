Cypress.Commands.add('loadDone', ()=>{
    cy.get('.cy_loading').should('not.exist', {timeout: 15000});
});

Cypress.Commands.overwrite('select', (x, subject, value)=>{
    cy.get(subject).click();
    cy.get(`[data-value="${value}"]`).click();
});