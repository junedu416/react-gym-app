

describe('Login Page', () => {
    let uid;
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/users/sign-up', {
            email: 'cyptest@email.com',
            membershipNumber: 1111,
            firstName: "Test",
            lastName: "User",
            password: "passWord1",
            passwordConfirm: "passWord1"
        }).its('body').then((response) => {
            uid = response.userId;
        })

        console.log(uid)
    })

    afterEach(() => {
        cy.request('DELETE', 'http://localhost:3000/users/delete', {
            uid: uid 
        }).its('body')
    })

    it('Visits the login page', () => {
        cy.visit('/auth/login')
        cy.contains('Login')
    })

    it('should log in an existing user', () => {
        cy.visit('/auth/login')
        cy.get('input[name=email]').type('cyptest@email.com')
        cy.get('input[name=password]').type(`passWord1{enter}`)
        cy.url().should('include', '/overview')
    })
})