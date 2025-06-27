// Comment mocks for Cypress tests

export const mockMainComments = [
  {
    id: '1',
    comment: 'Test comment 1',
    likes: 5,
    user_id: 'user1',
    post_id: 'post1',
    username: 'admin',
    timestamp: '2023-10-01T12:00:00Z',
  },
];

export const mockReplies = [];

export function interceptGetMainComments(postId = 'post1') {
  cy.intercept('GET', `/comments/post/${postId}/main`, mockMainComments).as('getMainComments');
}

export function interceptGetReplies(postId = 'post1') {
  cy.intercept('GET', `/comments/post/${postId}/replies*`, mockReplies).as('getReplies');
} 