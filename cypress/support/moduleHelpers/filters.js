Cypress.Commands.add('setFilter', (filterType, filterValue)=>{
    cy.get(`#cypress_filter_${filterType}`).select(filterValue);
});

Cypress.Commands.add('searchDedupes', ()=>{
    cy.get(`#cypress_searchDedupes`).click();
    cy.loadingDone();
});