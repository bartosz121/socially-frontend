describe("Home page", () => {
  it("Successfully loads", () => {
    cy.visit("/");

    // Sign In/Out buttons
    cy.get('[href="/auth/signin"]').should("be.visible");
    cy.get('[href="/auth/signup"]').should("be.visible");
  });
});
