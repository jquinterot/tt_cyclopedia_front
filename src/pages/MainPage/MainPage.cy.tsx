import MainPage from './MainPage';

beforeEach(() => {
  cy.intercept('GET', '/posts', {
    statusCode: 200,
    body: [
      { id: '1', title: 'Test Post', content: 'Test content' },
      // Add more mock posts if needed
    ],
  }).as('getPosts');
});

describe('<MainPage />', () => {
  it('renders complete main page structure', () => {
    cy.mount(<MainPage />);
    
    // Check main page structure
    cy.get('[data-testid="main-page"]').should('exist');
    cy.get('[data-testid="main-content"]').should('exist');
    
    // Check navigation and footer
    cy.get('[data-testid="navbar"]').should('exist');
    cy.get('[data-testid="footer"]').should('exist');
    
    // Check PostList is rendered
    cy.get('[data-testid="post-list-container"]').should('exist');
  });

  it('has proper page layout', () => {
    cy.mount(<MainPage />);
    
    // Check main page has proper styling
    cy.get('[data-testid="main-page"]')
      .should('have.class', 'min-h-screen')
      .and('have.class', 'flex')
      .and('have.class', 'flex-col');
    
    // Check main content has proper styling
    cy.get('[data-testid="main-content"]')
      .should('have.class', 'flex-grow')
      .and('have.class', 'flex')
      .and('have.class', 'justify-center');
  });
}); 