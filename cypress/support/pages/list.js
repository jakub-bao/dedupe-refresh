Cypress.Commands.add('loadDone', ()=>{
    cy.get('.cy_loading').should('not.exist', {timeout: 15000});
});
