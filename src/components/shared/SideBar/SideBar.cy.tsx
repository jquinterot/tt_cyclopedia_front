import SideBar from './SideBar';

describe('<SideBar />', () => {
  beforeEach(() => {
    cy.mount(<SideBar />);
  });

  it('renders sidebar content', () => {
    cy.get('.sidebar').should('exist');
    cy.contains('this is a nav bar').should('be.visible');
  });
}); 