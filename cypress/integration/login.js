
describe('Login Page', () => {
    let uid;
    beforeEach(() => {
        cy.clearLocalStorage()
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

        cy.visit('/auth/login')
    })

    afterEach(() => {
        cy.request('DELETE', 'http://localhost:3000/users/delete', {
            uid: uid 
        }).its('body')
    })

    const loginCorrectUser = () => {
        cy.get('input[name=email]').type('cyptest@email.com')
        cy.get('input[name=password]').type(`passWord1{enter}`)
    }

    it('Visits the login page', () => {
        cy.contains('Login')
    })

    it('should log in an existing user', () => {
        loginCorrectUser();
        cy.url().should('include', '/overview')
    })

    it('should not log in a non-existing user', () => {
        cy.get('input[name=email]').type('idontexist@email.com')
        cy.get('input[name=password]').type(`passWord1{enter}`)
        cy.contains('Incorrect email or password')
    })

    it('should save uid in localStorage if rememberMe is selected (default)', () => {
        loginCorrectUser();
        cy.url().should('include', '/overview')
        cy.window().then(
            window => expect(window.localStorage.getItem('uid')).to.equal(uid)
         )
    })

    it('should not save uid in localStorage if rememberMe is not selected', () => {
        cy.get('input[name=email]').type('cyptest@email.com')
        cy.get('input[name=password]').type(`passWord1`)
        cy.get('input[name=checked]').click()
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/overview')
        cy.window().then(
            window => expect(window.localStorage.getItem('uid')).to.equal(null)
        )
    })

})