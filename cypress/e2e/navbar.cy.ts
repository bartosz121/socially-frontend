describe("Navbar behavior", () => {
  it("Sign In button redirects to signin page", () => {
    cy.visit("/");
    cy.get('[href="/auth/signin"]').click();
    cy.location("pathname").should("eq", "/auth/signin");
  });

  it("Sign Up button redirects to signin page", () => {
    cy.visit("/");
    cy.get('[href="/auth/signup"]').click();
    cy.location("pathname").should("eq", "/auth/signup");
  });
});
