/* global cy */

describe("add,edit & delete job", () => {
  it("render landing page nd login user", () => {
    cy.visit("/");
    cy.get('[data-cy="login/register"]').click();
    cy.get(":nth-child(3) > .form-input").type(Cypress.env("email"));
    cy.get(":nth-child(4) > .form-input").type(Cypress.env("password"));
    cy.get('[data-cy="login/register"]').click();
    cy.wait(3000);
  });

  it("add job and view the added job", () => {
    cy.get('.nav-links-container > .nav-links > [href="/add-job"]').click();
    cy.get(":nth-child(1) > .form-input").type("job position");
    cy.get(":nth-child(2) > .form-input").type("company");
    cy.get(":nth-child(3) > .form-input").clear();
    cy.get(":nth-child(3) > .form-input").type("job location");
    cy.get(":nth-child(4) > .form-select").select("remote");
    cy.get(":nth-child(5) > .form-select").select("interview");
    // Clear inputs
    cy.get('[data-cy="clear"]').click();
    // Repeat inputs
    cy.get(":nth-child(1) > .form-input").type("job position");
    cy.get(":nth-child(2) > .form-input").type("company");
    cy.get(":nth-child(3) > .form-input").clear();
    cy.get(":nth-child(3) > .form-input").type("job location");
    cy.get(":nth-child(4) > .form-select").select("remote");
    cy.get(":nth-child(5) > .form-select").select("interview");
    cy.get('[data-cy="save/add_job"]').click();
    cy.get('.nav-links-container > .nav-links > [href="/all-jobs"]').click();
  });

  it("edit job and view the edited job", () => {
    cy.url().should("include", "/all-jobs");
    cy.get(
      ':nth-child(1) > .content > footer > .actions > [data-cy="edit"]'
    ).click();
    cy.get(":nth-child(1) > .form-input").clear();
    cy.get(":nth-child(1) > .form-input").type("edited job position");
    cy.get(":nth-child(2) > .form-input").clear();
    cy.get(":nth-child(2) > .form-input").type("edited company");
    cy.get(":nth-child(3) > .form-input").clear();
    cy.get(":nth-child(3) > .form-input").type("edited job location");
    cy.get(":nth-child(4) > .form-select").select("full-time");
    cy.get(":nth-child(5) > .form-select").select("declined");
    // CLEAR_VALUES isEditing: false in src/context/reducer.js
    cy.get('[data-cy="save/add_job"]').click();
    cy.wait(3000);
  });

  it("delete job and check if no jobs to display is shown", () => {
    cy.url().should("include", "/all-jobs");
    cy.get(
      ':nth-child(1) > .content > footer > .actions > [data-cy="delete"]'
    ).click();
    cy.get('[data-cy="cancel"]').click();
    cy.get(
      ':nth-child(1) > .content > footer > .actions > [data-cy="delete"]'
    ).click();
    cy.get('[data-cy="confirm"]').click();
    cy.get('[data-cy="no_jobs"]').contains("no jobs to display", {
      matchCase: false,
    });
  });

  it("logout user and navigate to landingpage", () => {
    cy.url().should("include", "/all-jobs");
    cy.get('.nav-links-container > .nav-links > [href="/landing"]').click();
  });
});
