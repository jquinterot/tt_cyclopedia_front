import PostCard from './PostCard';

const mockPost = {
  id: "1",
  title: "Test Post",
  content: "Test content",
  image_url: "/test.jpg",
  likes: 5,
};

describe('<PostCard />', () => {
  it('renders post card with correct data', () => {
    const mockOnClick = () => {};
    cy.mount(<PostCard post={mockPost} onClick={mockOnClick} />);
    
    cy.get('[data-testid="post-card-1"]').should('exist');
    cy.get('[data-testid="post-title-1"]').should('contain', 'Test Post');
    cy.get('[data-testid="post-excerpt-1"]').should('contain', 'Test content');
  });

  it('calls onClick when card is clicked', () => {
    let called = false;
    const mockOnClick = () => { called = true; };
    cy.mount(<PostCard post={mockPost} onClick={mockOnClick} />);
    
    cy.get('[data-testid="post-card-1"]').click().then(() => {
      expect(called).to.be.true;
    });
  });

  it('displays likes count', () => {
    const mockOnClick = () => {};
    cy.mount(<PostCard post={mockPost} onClick={mockOnClick} />);
    
    cy.contains('5').should('exist');
  });
}); 