Cypress.Commands.add('loadDone', ()=>{
    cy.get('.cy_loading').should('not.exist', {timeout: 15000});
});

Cypress.Commands.overwrite('select', (x, subject, value)=>{
    cy.get(subject).click();
    cy.get(`[data-value="${value}"]`).click();
});

Cypress.Commands.add('setFilter', (filterType, filterValue)=>{
    cy.get(`#cypress_filter_${filterType}`).select(filterValue);
});

Cypress.Commands.add('searchDedupes', ()=>{
    cy.get(`#cypress_searchDedupes`).click();
});
