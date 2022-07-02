describe("Sign up and sign in", () => {
  it("Lets visitors sign up", () => {
    cy.visit("/auth/signup");
    cy.intercept("POST", "/api/v1/auth/register/").as("signup");

    // button is disabled
    cy.get("form button:first")
      .should("be.visible")
      .should("have.class", "btn-disabled");

    cy.fixture("user.json").then((userData) => {
      cy.get("#email").type(userData.email);
      cy.get("#password1").type(userData.password);
      cy.get("#password2").type(userData.password);
    });

    cy.get("form button:first").click();

    cy.wait("@signup").its("response.statusCode").should("eq", 201);
  });

  it("Lets users sign in", () => {
    cy.visit("/auth/signin");
    cy.intercept("POST", "/api/v1/auth/login/").as("signin");

    // button is disabled
    cy.get("form button:first")
      .should("be.visible")
      .should("have.class", "btn-disabled");

    cy.fixture("user.json").then((userData) => {
      cy.get("#email").type(userData.email);
      cy.get("#password").type(userData.password);
    });

    cy.get("form button:first").click();
    cy.wait("@signin").its("response.statusCode").should("eq", 200);
  });
});
