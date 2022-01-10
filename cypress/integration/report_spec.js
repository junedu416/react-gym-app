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
        let uid;
        let reportId;

        it('Creates User', () => {
            cy.request('POST', 'http://localhost:3000/users/sign-up', {
                email: 'cypress@email.com',
                membershipNumber: 1234,
                firstName: "Test",
                lastName: "User",
                password: "passWord1",
                passwordConfirm: "passWord1"
            }).its('body').then((response) => {
                uid = response.userId;
            })

            console.log(uid)
        })

        it('Visits the login page', () => {
            cy.visit('/auth/login')
            cy.contains('Login')
        })
    
        it('should log in an existing user', () => {
            cy.visit('/auth/login')
            cy.get('input[name=email]').type('cypress@email.com')
            cy.get('input[name=password]').type(`passWord1{enter}`)
            cy.url().should('include', '/overview')
        })

        it("Visits /contact", () => {
            cy.contains("Reports").click();
        });

        it("Displays dropdown which creates a text input on selection", () => {
            cy.get('div[id=inquiryType').click();
            cy.contains('Faulty').click();
            cy.contains('Your Message');
        });
        it("Displays success message after report is sent", () => {
            cy.intercept('POST', 'http://localhost:3000/reports', (req) => {
                req.reply((res) => {
                    reportId = res.body._id;
                });
            })
            cy.get('textarea[name=description').type('Im a message');
            cy.get('svg[data-testid=SendIcon]').click();
            
            
            cy.contains("Success");
        });

        it("Deletes user", () => {
            cy.request('DELETE', 'http://localhost:3000/users/delete', {
                uid: uid 
            }).its('body');
        });
        
        it("Deletes report from db", () => {
            cy.request('DELETE', `http://localhost:3000/reports/${reportId}`).its('body');
        })
        
    });
});