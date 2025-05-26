describe("Movie Carousel", () => {
  beforeEach(() => {
    cy.visit("/movies/1098006");
  });

  it("shows carousel and allows navigation", () => {
    cy.get('button[aria-label="Previous movies"]').should("be.disabled");
    cy.get('button[aria-label="Next movies"]')
      .should("exist")
      .and("not.be.disabled");

    cy.get('button[aria-label="Previous movies"]')
      .parent()
      .within(() => {
        cy.get('button[aria-label="Previous movies"]')
          .nextAll()
          .should("exist");
      });

    function clickNextUntilDisabled() {
      cy.get('button[aria-label="Next movies"]').then(($btn) => {
        if (!$btn.is(":disabled")) {
          cy.wrap($btn).click();
          clickNextUntilDisabled();
        }
      });
    }
    clickNextUntilDisabled();

    cy.get('button[aria-label="Next movies"]').should("be.disabled");

    function clickPrevUntilDisabled() {
      cy.get('button[aria-label="Previous movies"]').then(($btn) => {
        if (!$btn.is(":disabled")) {
          cy.wrap($btn).click();
          clickPrevUntilDisabled();
        }
      });
    }
    clickPrevUntilDisabled();

    cy.get('button[aria-label="Previous movies"]').should("be.disabled");
  });
});

describe("Person Carousel", () => {
  beforeEach(() => {
    cy.visit("/movies/1098006");
  });

  it("clicks right 3 times, then holds until disabled, and checks carousel movement", () => {
    cy.get('button[aria-label="Scroll right"]').as("rightBtn");

    cy.get(".snap-start").then(() => {
      for (let i = 0; i < 3; i++) {
        cy.get("@rightBtn").should("not.be.disabled").click();
      }

      cy.wait(400);
    });

    function clickRightUntilDisabled() {
      cy.get("@rightBtn").then(($btn) => {
        if (!$btn.is(":disabled")) {
          cy.wrap($btn).click();
          clickRightUntilDisabled();
        }
      });
    }
    clickRightUntilDisabled();

    cy.get("@rightBtn").should("be.disabled");
  });

  it("carousel item position changes after click", () => {
    cy.get('button[aria-label="Scroll right"]').as("rightBtn");

    cy.get(".snap-start")
      .first()
      .then(($el) => {
        const rectBefore = $el[0].getBoundingClientRect();
        const leftBefore = rectBefore.left;
        const rightBefore = rectBefore.right;

        cy.get("@rightBtn").should("not.be.disabled").click();

        cy.wait(400);

        cy.get(".snap-start")
          .first()
          .then(($elAfter) => {
            const rectAfter = $elAfter[0].getBoundingClientRect();
            const leftAfter = rectAfter.left;
            const rightAfter = rectAfter.right;

            expect(leftAfter).not.to.eq(leftBefore);
            expect(rightAfter).not.to.eq(rightBefore);
          });
      });
  });

  it("carousel item returns to previous position after one right and one left click", () => {
    cy.get('button[aria-label="Scroll right"]').as("rightBtn");
    cy.get('button[aria-label="Scroll left"]').as("leftBtn");

    cy.get(".snap-start")
      .first()
      .then(($el) => {
        const rectBefore = $el[0].getBoundingClientRect();
        const leftBefore = rectBefore.left;
        const rightBefore = rectBefore.right;

        cy.get("@rightBtn").should("not.be.disabled").click();
        cy.wait(400);

        cy.get("@leftBtn").should("not.be.disabled").click();
        cy.wait(400);

        cy.get(".snap-start")
          .first()
          .then(($elAfter) => {
            const rectAfter = $elAfter[0].getBoundingClientRect();
            const leftAfter = rectAfter.left;
            const rightAfter = rectAfter.right;

            expect(leftAfter).to.eq(leftBefore);
            expect(rightAfter).to.eq(rightBefore);
          });
      });
  });
});
