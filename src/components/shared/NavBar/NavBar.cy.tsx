import NavBar from './NavBar'

describe('<NavBar />', () => {
  it('renders', () => {
    cy.mount(<NavBar />);
    
    cy.get('nav').should("be.visible");
    cy.get('ul a').should("have.text", "Create Post");
  })
})