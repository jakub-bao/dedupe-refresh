const allMethods = ['sum', 'maximum', 'custom'];

Cypress.Commands.add('checkResolved', {prevSubject: true},(subject, method)=>{
    if (method === 'none') {
        allMethods.forEach(method => {
            cy.get(subject).find('.cypress_resolutionMethodCell').find(`.cypress_resolutionMethod_${method}`).checked(false);
        })
    } else {
        cy.get(subject).find('.cypress_resolutionMethodCell').find(`.cypress_resolutionMethod_${method}`).checked(true);
    }
});

Cypress.Commands.add('resolveAs',{prevSubject: true}, (subject, type, value)=>{
    cy.get(subject)
        .find('.cypress_resolutionMethodCell')
        .find(`.cypress_resolutionMethod_${type}`)
        .click();
});

Cypress.Commands.add('checkCustomValue',{prevSubject: true}, (subject, value)=>{
    cy.get(subject)
        .find('.cypress_resolutionMethodCell')
        .find(`.cypress_resolutionMethod_custom`)
        .find('.cypress_customValueInput')
        .find('input')
        .should('have.value',value);
});

Cypress.Commands.add('save', {prevSubject: true}, (subject)=>{
    cy.get(subject).find('.cypress_actionCell').find('.cypress_actionCell_button').click();
});