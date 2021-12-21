import React from 'react';
import { Button } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react'; 

class Login extends React.Component {

  render() {

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return(
      <>
      <Button onClick={() => this.props.auth0.loginWithRedirect()}>Login</Button>
      </>
    )
  }
}
export default withAuth0(Login);