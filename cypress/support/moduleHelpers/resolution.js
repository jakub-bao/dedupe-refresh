const allMethods = ['sum', 'maximum', 'custom'];

Cypress.Commands.add('checkResolved', {prevSubject: true},(subject, method)=>{
    if (method === 'none') {
        allMethods.forEach(method => {
            cy.get(subject).find('.cypress_resolutionMethodCell').find(`.cypress__${method}`).checked(false);
        })
    } else {
        cy.get(subject).find('.cypress_resolutionMethodCell').find(`.cypress__${method}`).checked(true);
    }
});

Cypress.Commands.add('resolveAs',{prevSubject: true}, (subject, type, value)=>{
    cy.get(subject)
        .find('.cypress_resolutionMethodCell')
        .find(`.cypress__${type}`)
        .click();
});