const sumResolvedDedupeInfo = [
    'HTS_RECENT (N, DSD, KeyPop/RTRI/HIVStatus): HIV',
    'PWID, Recent RTRI, Positive',
    'ab Aba North',
    'Abt Associates Inc.',
    'JSI Research And Training Institute, INC.',
    '14169',
    '14302',
    '20010',
    '20020',
    'USAID',
    'Maximum (20020)',
    'Sum (40030)'
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
        cy.results().containsNotAll(sumResolvedDedupeInfo);
        cy.results().contains('No duplicates found matching the selected criteria');
    });

    it('Should be able to see resolved dedupes', ()=>{
        cy.get('#cypress_IncludeResolved').click();
        cy.searchDedupes();
        cy.getResultByOrder(0).containsAll(sumResolvedDedupeInfo);
    });
});
