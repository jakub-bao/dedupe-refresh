const filterOptions = {
    organisationUnit: ['Asia Region', 'Botswana'],
    dataType: ['MER Targets', 'MER Results'],
    period: ['Oct 2019 - Sep 2020', 'Oct 2020 - Sep 2021'],
    agency: ['HHS/CDC','State/SGAC','USAID'],
    technicalArea: ['AGYW','KP_MAT','LAB_PT_HIV'],
    dedupeType: ['Pure Dedupes', 'Crosswalk Dedupes']
};

function generateFilterOptionsTest(filterType, options){
    it(`Should have options for ${filterType} filter`, ()=>{
        cy.get(`#cypress_filter_${filterType}`).click();
        cy.containsAll(options);
        cy.get('.MuiMenuItem-root:nth-child(1)').click();
    });
}

describe('Filters > Filter Options', ()=>{
    before(()=>{
        cy.loginAs('de-interAgency-rwanda');
        cy.goHome();
    });

    Object.keys(filterOptions).map(filterType=>generateFilterOptionsTest(filterType, filterOptions[filterType]));

});