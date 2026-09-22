/**
 * skenario pengujian
 *
 * - Login spec
 *  - should display login page correctly
 *  - should display alert when email and password are wrong
 *  - should display homepage and user profile when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    // Intercept preload API call so application renders immediately without race conditions
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Missing authentication',
      },
    }).as('preloadCheck');

    cy.clearLocalStorage();
    cy.visit('/login');
    cy.wait('@preloadCheck');
    cy.get('input#email').should('be.visible');
  });

  it('should display login page correctly', () => {
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button[type="submit"]').contains(/masuk sekarang/i).should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    // Intercept network call to simulate failed login
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginFail');

    cy.get('input#email').type('wrong_email@example.com');
    cy.get('input#password').type('wrong_password');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');
    cy.on('window:alert', (text) => {
      expect(text).to.contains('email or password is wrong');
    });
  });

  it('should display homepage and user profile when email and password are correct', () => {
    // Intercept network call to simulate successful login and profile fetching
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'cypress-test-token',
        },
      },
    }).as('loginSuccess');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'cypress_user',
            name: 'Cypress Tester',
            email: 'tester@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Cypress+Tester',
          },
        },
      },
    }).as('getProfile');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          threads: [],
        },
      },
    });

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          users: [],
        },
      },
    });

    cy.get('input#email').type('tester@example.com');
    cy.get('input#password').type('secret123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSuccess');
    cy.wait('@getProfile');

    // Homepage navigation assertion
    cy.get('header').should('be.visible');
    cy.get('header').find('img[alt="Cypress Tester"]').should('be.visible');
    cy.get('button[title="Keluar"]').should('be.visible');
  });
});

