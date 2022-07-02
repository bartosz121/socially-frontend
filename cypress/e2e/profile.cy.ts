describe("Profile page", () => {
  beforeEach(() => {
    cy.fixture("user.json").then((userData) => {
      cy.request("POST", "http://localhost/api/v1/auth/login/", {
        email: userData.email,
        password: userData.password,
      });
      cy.visit(`/profiles/${userData.username}`);
    });
  });

  it("Follow/unfollow", () => {
    cy.intercept("POST", /api\/v1\/profiles\/[a-zA-Z0-9_]+\/follow/).as(
      "follow"
    );
    cy.get(".md\\:mt-0 > .btn").should("have.text", "Follow");
    cy.get(".md\\:mt-0 > .btn").click();
    cy.wait("@follow").its("response.statusCode").should("eq", 200);

    cy.get(".md\\:mt-0 > .btn").should("have.text", "Unfollow");
    cy.get(".md\\:mt-0 > .btn").click();
    cy.wait("@follow").its("response.statusCode").should("eq", 200);
  });
});
