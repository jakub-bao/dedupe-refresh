const baseUrl = require('../../../src/config/serverConfig.dev').baseUrl;

Cypress.Commands.add('deleteDataValue', (user, query)=>{
    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: `${baseUrl}/dataValues.json/${query}`,
        auth: {
            'user': `cypress-${user}`,
            'pass': 'Cypress1!',
        }
    }).then((res)=>{
        console.log(`Deleting data value as user ${user}, query: ${query}`);
        console.log(res);
    });
});