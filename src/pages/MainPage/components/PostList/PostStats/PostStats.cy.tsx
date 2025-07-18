import PostStats from './PostStats';
import { STAT_CONFIG } from '@/config/statConfig';

describe('<PostStats />', () => {
  const mockStats = Object.fromEntries(STAT_CONFIG.map(cfg => [cfg.key, 7]));

  it('renders stats heading', () => {
    cy.mount(<PostStats stats={mockStats} />);
    cy.get('[data-testid="stats-heading"]').should('exist');
    cy.contains('Stats').should('exist');
  });

  it('renders all stat bars', () => {
    cy.mount(<PostStats stats={mockStats} />);
    STAT_CONFIG.forEach(cfg => {
      cy.contains(cfg.label).should('exist');
    });
  });
}); 