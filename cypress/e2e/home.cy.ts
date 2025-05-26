describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the app title", () => {
    cy.contains("Cool Movies");
  });

  it("displays trending movies", () => {
    cy.get('[data-testid="MediaCard"]').should("have.length.greaterThan", 0);
  });

  it("navigates to a movie details page", () => {
    cy.get('[data-testid="MediaCard"]').first().click();
    cy.url().should("include", "/movies/");
    cy.get('[data-testid="MovieDetails"]').should("exist");
  });

  it("searches for a movie", () => {
    cy.get('input[placeholder="Search"]').type("Inception{enter}");
    cy.url().should("include", "q=Inception");
    cy.get('[data-testid="MediaCard"]').should("exist");
    cy.contains(/Inception/i);
  });

  it("filters by TV shows", () => {
    cy.get('[data-testid="FilterTabs"]')
      .contains(/tv shows/i)
      .click();
    cy.get('[data-testid="MediaCard"]').each((card) => {
      cy.wrap(card).contains(/tv/i, { matchCase: false });
    });
  });

  it("paginates results", () => {
    cy.get('[data-testid="next-btn"]').click();
    cy.url().should("include", "page=2");
    cy.get('[data-testid="MediaCard"]').should("exist");
  });

  it("shows error message on API failure", () => {
    cy.intercept("GET", "/search/multi*", { statusCode: 500 }).as(
      "searchError"
    );
    cy.get('input[placeholder="Search"]').type("error{enter}");
    cy.wait("@searchError");
    cy.contains(/error/i);
  });
});
