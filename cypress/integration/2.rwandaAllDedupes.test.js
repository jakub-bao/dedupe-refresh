describe('Rwanda All Dedupes', ()=> {
    before(() => {
        cy.loginAs('de-interAgency-rwanda');
        cy.goHome();
    });
    
    it('Should be able to view Rwanda dedupes', ()=>{
        cy.get(`#cypress_filter_organisationUnit`).select('XtxUYCsDWrR');
        cy.get('#cypress_results').containsAll([
            'HTS_TST (N, DSD, KeyPop/Result): HTS received results',
            'PWID, Negative',
            'Gashora Sector',
            'USAID',
            'Cooperative Housing Foundation Corp.',
            'Caritas Rwanda Asbl',
            '17616',
            '16858',
            '10010',
            '10020',
            '10030',
            '10040'
        ]);
    });
});
