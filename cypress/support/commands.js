// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

Cypress.Commands.add('clearStorage', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})

Cypress.Commands.add('addProductToCart', (product) => {
  cy.visit(product.url)
  cy.wait(2000)
  cy.get('button:contains("Add to Cart")').click()
  cy.wait(2000)
})

Cypress.Commands.add('removeCartItem', () => {
  cy.get('@products').then((products) => {
    const { removeButton } = products.selectors
    cy.get(removeButton).click()
  })
})

Cypress.Commands.add('goToCheckout', () => {
  cy.contains('button', 'Go to checkout').click()
  cy.wait(2000)
})

Cypress.Commands.add('fillShippingAddress', (address) => {
  cy.contains('h2', 'Shipping address')
      .siblings('button')
      .click({ force: true });
  cy.get('input#search-address')
      .should('be.visible')
      .should('not.be.disabled')
      .clear()
      .type(address);
  cy.get('[data-sentry-component="AddressSuggestionItem"]')
      .first()
      .click();
  cy.get('[data-sentry-source-file="ShippingAddressDrawer.tsx"]')
      .click();
});

Cypress.Commands.add('fillContactInformation', (email, fullName, phoneNumber) => {
  cy.get('#email').type(email);
  cy.get('#fullName').type(fullName);
  cy.get('#phoneNumber').type(phoneNumber);
});

Cypress.Commands.add('verifyNewsSubscription', () => {
  cy.contains('label', "like to receive news")
      .find('span[data-checked="true"]')
      .should('exist');
  cy.get('input[name="receiveSellerOffer"]').next('span').click();
});

Cypress.Commands.add('editReceiverAddress', (receiverName) => {
  cy.get('button[data-sentry-element="Button"][data-sentry-source-file="EditAddressButton.tsx"]')
      .should('be.visible')
      .click();
  cy.get('#receiverName').type(receiverName);
  cy.get('button[type="submit"]')
      .contains('Continue')
      .should('be.visible')
      .click();
});

Cypress.Commands.add('goToPayment', () => {
  cy.get('button[type="button"]')
      .contains('Go to payment')
      .should('be.visible')
      .click();
});

Cypress.Commands.add('goToContinueCheckout', () => {
  cy.get('button[type="button"]')
      .contains('Continue to Checkout')
      .should('be.visible')
      .click();
});

Cypress.Commands.add('selectPaymentOption', () => {
  cy.get('button[data-sentry-element="PaymentOptionItemCard"]').first()
      .click();
});

Cypress.Commands.add('fillPaymentInformation', (cardNumber, holderName, expirationDate, securityCode) => {
  cy.get('#cardNumber').type(cardNumber);
  cy.get('#holderName').type(holderName);
  cy.get('#expirationDate').type(expirationDate);
  cy.get('#securityCode').type(securityCode);
});

Cypress.Commands.add('verifySectionWithButton', (sectionTitle, buttonText) => {
  cy.contains(sectionTitle)
    .should('exist')
    .siblings('button')
    .contains(buttonText)
    .should('exist')
})

Cypress.Commands.add('addShippingAddress', () => {
  cy.fixture('cartData').then((data) => {
    cy.contains('Shipping')
      .should('be.visible')
      .click()
    cy.get('#search-address')
      .should('be.visible')
      .type(data.shippingOptions.shipping.zipCode)
    cy.contains('span', data.shippingOptions.shipping.fullAddress)
      .should('be.visible')
      .click()
    cy.contains('button', 'Update')
      .should('be.visible')
      .click()
  })
})

Cypress.Commands.add('verifyUnavailableItemsMessage', (expectedCount) => {
  cy.fixture('cartData').then((data) => {
    const message = expectedCount === 1 
      ? '1 item in the cart is unavailable'
      : `${expectedCount} items in the cart are unavailable`
    
    cy.contains(message)
      .should('be.visible')
  })
})

Cypress.Commands.add('addPickupAddress', () => {
  cy.fixture('cartData').then((data) => {
    cy.contains('Pickup')
      .click()
    cy.wait(500)
    cy.contains('Pickup store')
      .should('exist')
      .siblings('button')
      .contains('Edit')
      .click({ force: true })
    cy.get('#search-address')
      .should('be.visible')
      .clear()
      .type(data.shippingOptions.pickup.zipCode)
    cy.wait(500)
    cy.contains('span', data.shippingOptions.pickup.fullAddress).should('be.visible').click()
    cy.wait(1000)
    cy.get('[data-sentry-source-file="DeliveryDrawerContent.tsx"]')
      .siblings('button')
      .contains('Continue')
      .click({ force: true })
  })
})

Cypress.Commands.add('verifyPickupDetailsAndConfirmStore', () => {
  cy.fixture('cartData').then((data) => {
    const details = data.shippingOptions.pickup.details
    
    // Verify country
    cy.contains(details.country).should('exist')
    
    // Verify distance
    cy.contains(details.distance).should('exist')
    
    // Verify pickup fee
    cy.contains(details.fee).should('exist')
    
    // Verify unavailable items message
    cy.contains(details.unavailableItems).should('exist')
    
    // Verify product details
    cy.contains(details.product.name).should('exist')
    cy.contains(details.product.quantity).should('exist')
    
    // Verify store address
    cy.contains(details.storeAddress).should('exist')
    cy.contains('Show opening hours').first().click()
    cy.contains('Select this store').should('exist').click({force: true})
    cy.contains('Standard Item is no longer available for the selected pickup store').should('exist')
  })
})