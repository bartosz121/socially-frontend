const postBody = "Cypress - create new post";
const updatedPostBody = "Cypress - updated post";
const commentBody = "Cypress - comment post";

describe("Actions with posts", () => {
  beforeEach(() => {
    cy.fixture("user.json").then((userData) => {
      cy.request("POST", "http://localhost/api/v1/auth/login/", {
        email: userData.email,
        password: userData.password,
      });
    });
  });

  it("Creates new post", () => {
    cy.visit("/");
    cy.get("form .flex > .btn").should("have.class", "btn-disabled");
    cy.get("form .textarea").type(postBody);
    cy.get("form .flex > .btn").should("not.have.class", "btn-disabled");
    cy.get("form .flex > .btn").click();
    cy.contains(postBody).should("be.visible");

    cy.get("form .textarea").should("have.value", "");
    cy.get("form .flex > .btn").should("have.class", "btn-disabled");
  });

  it("Updates created post", () => {
    cy.visit("/");
    cy.contains(postBody).should("be.visible");
    cy.get(
      ":nth-child(1) > .card > .card-body > .justify-start > .ml-auto > .btn-group > :nth-child(1) > a > .tooltip > .w-4"
    ).click();
    cy.location("pathname").should("match", /\/posts\/[0-9]+\/edit/);
    cy.get("form .textarea").should("have.value", postBody);
    cy.get("form .flex > .btn").should("not.have.class", "btn-disabled");
    cy.get("form .textarea").clear().type(updatedPostBody);
    cy.get("form .flex > .btn").click();
    cy.location("pathname").should("match", /\/posts\/[0-9]+/);
    cy.contains(updatedPostBody).should("be.visible");
    cy.get('[d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"]').should(
      "be.visible"
    );
  });

  it("Creates comment post", () => {
    cy.visit("/");
    cy.contains(updatedPostBody);
    cy.get(
      ":nth-child(1) > .card > .card-body > .card-actions > a > .flex > .icon"
    ).click();
    cy.get("form .textarea").type(commentBody);
    cy.get("form .flex > .btn").click();
    cy.contains(commentBody);

    cy.visit("/");
    cy.fixture("user.json").then((userData) => {
      cy.contains(`Replying to ${userData.username}`).should("be.visible");
    });
  });

  it("Likes and dislikes post", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .card > .card-body > .card-actions > .false > .icon"
    ).click();

    cy.get(".drop-shadow-like").should("be.visible");
    cy.get(".drop-shadow-like > .mx-2").should("contain.text", "1");
    cy.get(".drop-shadow-like").click();
    cy.get(
      ":nth-child(1) > .card > .card-body > .card-actions > .false"
    ).should("be.visible");
  });

  it("Deletes post", () => {
    cy.intercept("DELETE", /api\/v1\/posts\/[0-9]+\//).as("post-delete");

    cy.visit("/");
    cy.contains(updatedPostBody);
    cy.get(
      ":nth-child(2) > .card > .card-body > .justify-start > .ml-auto > .btn-group > :nth-child(2)"
    ).click();

    cy.wait("@post-delete").its("response.statusCode").should("eq", 204);
  });
});
