Cypress.Commands.add('loadingDone', ()=>{
    cy.get('.cypress_loading').should('not.exist', {timeout: 15000});
});

Cypress.Commands.overwrite('select', (x, subject, value)=>{
    cy.get(subject).click();
    cy.get(`[data-value="${value}"]`).click();
});

Cypress.Commands.add('setFilter', (filterType, filterValue)=>{
    cy.get(`#cypress_filter_${filterType}`).select(filterValue);
});

Cypress.Commands.add('searchDedupes', ()=>{
    cy.loadingDone();
    cy.get(`#cypress_searchDedupes`).click();
});

Cypress.Commands.add('filters', ()=>{
    return cy.get('#cypress_filters');
});

Cypress.Commands.add('results', ()=>{
    return cy.get('#cypress_results');
});

Cypress.Commands.add('header', ()=>{
    return cy.get('#cypress_header');
});