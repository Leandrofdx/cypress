// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// /checkout/cart?orderFormId=86fd517f73e34771bd5174d0345bed7e
    // it('Should search for the products and add it to the cart', () => {
    //     // cy.get('[alt="Standard Item"]').click();
    //     // cy.contains('Add to Cart').click();
    //     // cy.contains('Go to checkout').click();
    //     // cy.get('._1vn70ka3 > :nth-child(1) > .q3tmdc0 > ._16sqr9z7').click();
    //     cy.contains('button', 'Estimate').click({ force: true });
    //     cy.get('#search-address').type('10017');
    //     cy.contains('button', /Colvin Run Road.*Great Falls.*USA/).click();
    //     cy.contains('button', 'Update').should('be.enabled').click();


        

    //     //  cy.fixture('productsData').then((product) => {
    //     //     const email = faker.internet.email();

    //     //     cy.searchProduct(product.name);
    //     //     cy.addProductToCart();
    //     //     cy.verifyMinicart();
    //     //     cy.goToCheckout();
    //     //     cy.fillShippingAddress(product.address);
    //     //     cy.get('[data-sentry-source-file="CartActionButton.tsx"]').click();
    //     //     cy.fillContactInformation(email, 'Nome completo', '(201) 666-5877');
    //     //     cy.verifyNewsSubscription();
    //     //     cy.editReceiverAddress("Name");
    //     //     cy.goToPayment();
    //     //     cy.selectPaymentOption();
    //     //     cy.fillPaymentInformation(product.paymentInfo.cardNumber, product.paymentInfo.cardName, product.paymentInfo.cardExpiry, product.paymentInfo.cardCVC);
    //     // });
    // });

// Import commands.js using ES2015 syntax:
import './commands'