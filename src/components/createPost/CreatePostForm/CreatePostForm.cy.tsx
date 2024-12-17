import CreatePostForm from './CreatePostForm'

describe('<CreatePostForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreatePostForm />)
  })
})