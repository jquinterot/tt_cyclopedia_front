import CreatePostForm from './CreatePostForm';
import { MemoryRouter } from 'react-router-dom';


describe('<CreatePostForm />', () => {
  it('renders', () => {
    cy.mount(<MemoryRouter>
      <CreatePostForm />
    </MemoryRouter>)
  })
})