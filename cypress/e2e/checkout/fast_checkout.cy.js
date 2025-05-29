describe('Fast Checkout Flow', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  beforeEach(() => {
    cy.fixture('products').as('products')
    cy.fixture('paymentData').as('paymentData')
  })

  it('should add all products to cart', () => {
    cy.get('@products').then((data) => {
      data.products.forEach(product => {
        cy.addProductToCart(product)
      })
      cy.goToCheckout()
    })
  })

  it('should change cart item quantity', () => {
    cy.get('@products').then((data) => {
      data.products.forEach(product => {
        cy.get(`article[aria-label="${product.name}"]`)
          .find('select[name="Change Quantity"]')
          .select('2')
      })
    })
  })

  it('should display shipping and pickup options', () => {
    cy.fixture('cartData').then((data) => {
      cy.contains(data.shippingOptions.shipping.label).closest('label').should('be.visible').within(() => {
        cy.contains(data.shippingOptions.shipping.label).should('be.visible')
      })

      cy.contains(data.shippingOptions.pickup.label).closest('label').should('be.visible').within(() => {
        cy.contains(data.shippingOptions.pickup.label).should('be.visible')
      })
    })
  })

  it('should display Shipping and Pickup section and Promo code section', () => {
    const sections = [
      { title: 'Shipping address', button: 'Estimate' },
      { title: 'Pickup store', button: 'Add' },
      { title: 'Promo code', button: 'Add' }
    ]

    sections.forEach(section => {
      cy.verifySectionWithButton(section.title, section.button)
    })
  })

  it('should display order summary section', () => {
    cy.fixture('cartData').then((data) => {
      cy.contains('Order summary').should('exist')
      cy.contains('Subtotal').should('exist')
      cy.contains(data.orderSummary.subtotal).should('exist')
      cy.contains('Delivery').should('exist')
      cy.contains(data.orderSummary.delivery).should('exist')
      cy.contains('Discounts').should('exist')
      cy.contains(data.orderSummary.discounts).should('exist')
      cy.contains('Total').should('exist')
      cy.contains(data.orderSummary.total).should('exist')
    })
  })

  it('should display checkout and payment buttons', () => {
    cy.contains('Continue to Checkout').should('exist')
    cy.get('#apple-pay-button').should('exist')
    cy.get('#gpay-button-online-api-id').should('exist')
  })

  it('should display free shipping message', () => {
    cy.fixture('cartData').then((data) => {
      cy.contains(data.freeShipping.message).should('be.visible')
      cy.contains(data.freeShipping.message).find('a').should('have.attr', 'href', data.freeShipping.link)
    })
  })

  it('should add shipping address', () => {
    cy.addShippingAddress()
  })

  it('should display unavailable items message', () => {
    cy.verifyUnavailableItemsMessage(1)
  })

  it('should add pickup address and verify details', () => {
    cy.addPickupAddress()
    cy.wait(500)
    cy.verifyPickupDetailsAndConfirmStore()
  })

  it('should display items to review section', () => {
    cy.fixture('products').then((data) => {
      // Verify section title
      cy.contains('Items to review').should('exist')
      
      // Verify each product in the section
      data.products.forEach(product => {
        cy.contains(product.name).should('exist')
        cy.contains('Quantity2').should('exist')
      })
    })
  })

  it('should continue to checkout and verify shipping message', () => {
    cy.goToContinueCheckout()
    cy.contains('Want your order to be delivered to an address? Change to Shipping.').should('be.visible')
  })

  it('should display unavailable items message', () => {
    cy.contains('The cart was updated to remove unavailable items').should('be.visible')
  })

  it('should display pickup store availability message', () => {
    cy.contains('is no longer available for the selected pickup store').should('be.visible')
  })

  it('should verify visibility of checkout elements', () => {
    cy.contains('Save my personal info for a faster checkout').should('be.visible')
    cy.contains('I\'d like to receive news and offers via email').should('be.visible')
    cy.contains('Subscribe').should('be.visible')
    cy.contains('Options nearest to:').should('be.visible')
    cy.contains('Pickup').should('be.visible')
    cy.contains('Change pickup store').should('be.visible')
    cy.contains('Go to payment').should('be.visible')
  })

  it('should change to shipping and verify edit address elements', () => {
    cy.contains('Change to Shipping').click()
    cy.contains('Edit address').click()
  })

  it('should add street address', () => {
    cy.get('@paymentData').then((data) => {
      cy.get('#street').type(data.address.street + '{enter}')
      cy.get('#receiverName').type(data.address.receiverName)
      cy.contains('Continue').click()
    })
  })

  it('should change to pickup and fill information', () => {
    cy.get('[aria-live="polite"]').then($el => {
      $el.remove()
    })
    cy.contains('Change to Pickup').click()
    cy.contains('Change to Shipping').should('be.visible')
    cy.get('@paymentData').then((data) => {
      cy.get('#email').type(data.customer.email)
      cy.get('#fullName').type(data.customer.fullName)
      cy.get('#phoneNumber').type(data.customer.phone)
    })
  })

  it('should verify payment and order summary elements', () => {
    cy.contains('Go to payment').click()
    cy.contains('Payment').should('be.visible')
    cy.get('[aria-live="polite"]').then($el => {
      $el.remove()
    })
    cy.contains('Use gift card').should('be.visible')
    cy.contains('Order summary').should('be.visible')
    cy.contains('Delivery').should('be.visible')
    cy.get('@paymentData').then((data) => {
      cy.contains(data.customer.fullName).should('be.visible')
    })
    cy.contains('test@example.com').should('be.visible')
    cy.contains('Pickup').should('be.visible')
    cy.contains('BUY NOW').scrollIntoView().should('be.visible')
    cy.contains('Credit card').should('be.visible')
    cy.contains('Amex, Visa, Mastercard, or Elo').should('be.visible')
  })

  it('should complete credit card payment', () => {
    cy.contains('Credit card').click()
    cy.get('@paymentData').then((data) => {
      cy.get('#cardNumber').type(data.creditCard.number)
      cy.get('#holderName').type(data.creditCard.holderName)
      cy.get('#expirationDate').type(data.creditCard.expirationDate)
      cy.get('#securityCode').type(data.creditCard.securityCode)
    })
    cy.wait(2000)
    cy.contains('BUY NOW')
      .scrollIntoView()
      .should('be.visible')
      .trigger('mousedown', { force: true })
      .wait(500)
      .trigger('mouseup', { force: true })
      .click()
  })

  it('should verify purchase confirmation', () => {
    cy.wait(8000)
    cy.get('[aria-live="polite"]').then($el => {
      $el.remove()
    })
    cy.get('@paymentData').then((data) => {
      cy.contains(`${data.customer.name}, your purchase has been confirmed.`)
        .scrollIntoView()
        .should('be.visible')
    })
  })
}) 