describe('Cart Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });

  it('Should add a product to the cart', () => {
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });
});
it('Should sort products by price low to high', () => {
  // đảm bảo đang ở inventory
  cy.url().should('include', '/inventory.html');

  // chờ dropdown sort xuất hiện rồi chọn low->high
  cy.get('[data-test="product_sort_container"]')
    .should('be.visible')
    .select('lohi')
    .should('have.value', 'lohi');

  // chờ danh sách giá render
  cy.get('.inventory_item_price').should('have.length.greaterThan', 0);

  // lấy tất cả giá, kiểm tra giá đầu tiên là nhỏ nhất
  cy.get('.inventory_item_price').then(($prices) => {
    const nums = [...$prices].map((el) =>
      parseFloat(el.innerText.replace('$', '').trim())
    );

    const first = nums[0];
    const min = Math.min(...nums);

    expect(first).to.eq(min);
  });
});
it('Should remove product from cart and badge should disappear', () => {
  // Add sản phẩm đầu tiên
  cy.get('.inventory_item').first().find('.btn_inventory').click();
  cy.get('.shopping_cart_badge').should('have.text', '1');

  // Remove ngay tại trang inventory
  cy.get('.inventory_item').first().find('.btn_inventory').should('contain', 'Remove').click();

  // Badge không còn hiển thị
  cy.get('.shopping_cart_badge').should('not.exist');
});
it('Should go to checkout step two after filling information', () => {
  // Add 1 sản phẩm
  cy.get('.inventory_item').first().find('.btn_inventory').click();
  cy.get('.shopping_cart_badge').should('have.text', '1');

  // Vào giỏ hàng
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');

  // Checkout
  cy.get('[data-test="checkout"]').click();
  cy.url().should('include', '/checkout-step-one.html');

  // Nhập thông tin
  cy.get('[data-test="firstName"]').type('John');
  cy.get('[data-test="lastName"]').type('Doe');
  cy.get('[data-test="postalCode"]').type('12345');

  // Continue -> step two
  cy.get('[data-test="continue"]').click();
  cy.url().should('include', '/checkout-step-two.html');
});


