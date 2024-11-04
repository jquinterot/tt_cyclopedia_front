import NavBar from './NavBar'

describe('<NavBar />', () => {
  it('renders', () => {
    cy.mount(<NavBar />);
    
    cy.get('nav').should("be.visible");
    cy.get('li').should("have.text", "Menu");
  })
})