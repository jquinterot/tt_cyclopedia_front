import Footer from './Footer';

describe('<Footer />', () => {
  it('renders footer content correctly', () => {
    cy.mount(<Footer />);
    
    // Verify main content
    cy.get('footer').should('exist');
    
    // Check heading and description
    cy.contains('h2', 'TT Cyclopedia').should('be.visible');
    cy.contains('p', 'Your premier destination for comprehensive blade equipment reviews').should('be.visible');
    
    // Verify copyright text with dynamic year
    cy.contains('p.text-\\[0\\.7rem\\]', /© \d{4} TT Cyclopedia\. All rights reserved\./).should('be.visible');
  });

  it('has proper styling', () => {
    cy.mount(<Footer />);
    
    // Check main footer styling


    // Check border styling
    cy.get('.border-red-900')
      .should('exist');

    // Check responsive padding
    cy.get('.mx-auto.px-4').should('have.class', 'sm:px-6');
  });
});