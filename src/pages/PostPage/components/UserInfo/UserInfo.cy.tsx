import React from "react";
import UserInfo from './UserInfo'

describe('<UserInfo />', () => {
  it('renders', () => {
    cy.mount(<UserInfo userId="test-user-id" />)
  })
})