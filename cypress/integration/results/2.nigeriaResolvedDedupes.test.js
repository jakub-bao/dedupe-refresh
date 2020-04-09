const resolvedDedupeInfo = [
    'HTS_RECENT (N, DSD, KeyPop/RTRI/HIVStatus): HIV',
    'PWID, Recent RTRI, Positive',
    'ab Aba North',
    'Abt Associates Inc.',
    'JSI Research And Training Institute, INC.',
    '14169',
    '14302',
    '20010',
    '20020',
    'USAID'
];

describe('Nigeria Resolved Dedupes', ()=> {
    before(() => {
        cy.loginAs('de-interAgency-nigeria');
        cy.goHome();
    });

    it('Should not see resolved dedupes', ()=>{
        cy.setFilter('organisationUnit', 'PqlFzhuPcF1');
        cy.setFilter('dataType', 'RESULTS');
        cy.setFilter('period', '2020Q2');
        cy.searchDedupes();
        cy.get('#cypress_results').containsNotAll(resolvedDedupeInfo);
    });
});
