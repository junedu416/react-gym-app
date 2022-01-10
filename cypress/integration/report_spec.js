
describe("Reports", () => {
    describe("Not Signed In", () => {
        it("Visits /contact", () => {
            cy.visit('localhost:3001/contact');
        });
        it("Displays unauthorized message", () => {
            cy.contains("Unauthorized");
        });
        it("Login link redirects to login page", () => {
            cy.contains("login").click();
            cy.url().should('include', '/auth/login');
        })
    });

    describe("Signed In", () => {
        //LOGIN
        it("Visits /contact", () => {
            cy.visit('localhost:3001/contact');
        });
        it("Displays dropdown which creates a text input on selection", () => {

        });
        it("Displays success message after report is sent", () => {

        });
    });
});