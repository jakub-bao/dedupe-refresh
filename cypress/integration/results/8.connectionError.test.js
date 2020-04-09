describe('Search Connection Error', ()=> {
    before(() => {
        cy.loginAs('de-interAgency-rwanda');
        cy.goHome();
    });

    it('Should see connection error', ()=>{
        cy.setFilter('organisationUnit', 'XtxUYCsDWrR');
        cy.setFilter('dataType', 'RESULTS');
        cy.setFilter('period', '2020Q2');
        cy.loginAs('fail');
        cy.searchDedupes();
        cy.contains('Connection Error');
    });
});
