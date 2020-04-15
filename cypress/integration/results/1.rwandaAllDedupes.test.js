const dedupeContent1 = [
    'HTS_TST (N, DSD, KeyPop/Result): HTS received results',
    'PWID, Negative',
    'Gashora Sector',
    'USAID',
    'Cooperative Housing Foundation Corp.',
    'Caritas Rwanda Asbl',
    '17616',
    '16858',
    '10020',
    '10040',
    'Maximum (10040)',
    'Sum (20060)',
    'Ready to be resolved',
    'Please select resolution method'
];


describe('Rwanda All Dedupes', ()=> {
    before(() => {
        cy.loginAs('de-interAgency-rwanda');
        cy.goHome();
    });
    
    it('Should be able to view Rwanda dedupes', ()=>{
        cy.setFilter('organisationUnit', 'XtxUYCsDWrR');
        cy.setFilter('dataType', 'RESULTS');
        cy.setFilter('period', '2020Q2');
        cy.searchDedupes();

        cy.getResultByOrder(0).containsAll(dedupeContent1);
        cy.getResultByOrder(1).containsAll(['Maximum (10030)', 'Sum (20040)', 'Ready to be resolved']);
        cy.getResultByOrder(0).checkResolved('none');
        cy.getResultByOrder(1).checkResolved('none');
    });

    it('Should be able to resolve a dedupe', ()=>{
        cy.deleteDataValue('de-interAgency-rwanda', 'de=qhGxKnmrZBd&co=xYyVHiXrvSi&ds=qzVASYuaIey&ou=TAPALAZae2l&pe=2020Q2&cc=wUpfppgjEza&cp=wXNP2RRZqbj');

        cy.getResultByOrder(0).resolveAs('maximum');
        cy.getResultByOrder(0).checkResolved('maximum');
        cy.getResultByOrder(0).containsAll(['Ready to be saved', 'Save']);
        cy.getResultByOrder(0).save();

    });
});
