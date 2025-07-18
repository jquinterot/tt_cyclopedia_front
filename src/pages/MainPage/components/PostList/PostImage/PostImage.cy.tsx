import PostImage from './PostImage';


describe('<PostImage />', () => {
  it('renders image with correct attributes', () => {
    cy.mount(<PostImage src="/test.jpg" alt="Test Post" postId="1" defaultImageUrl="/default.jpg" />);
    
    cy.get('[data-testid="post-image-1"]')
      .should('have.attr', 'src', '/test.jpg')
      .and('have.attr', 'alt', 'Test Post');
  });

  it('renders image container', () => {
    cy.mount(<PostImage src="/test.jpg" alt="Test Post" postId="1" defaultImageUrl="/default.jpg" />);
    
    cy.get('[data-testid="post-image-container-1"]').should('exist');
  });
}); 