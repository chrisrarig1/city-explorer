import React from 'react';
import { Button } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react'; 

class Logout extends React.Component {

  render() {

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return(
      <>
      <Button onClick={() => this.props.auth0.logout({ returnTo: window.location.origin })}>Log Out</Button>
      </>
    )
  }
}
export default withAuth0(Logout);