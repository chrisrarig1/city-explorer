import React from "react";
import { Navbar,Nav,Container } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react'; 
import Login from "./Login";
import Logout from "./Logout";

class Header extends React.Component{
    render(){
        return(
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home" style={{fontSize:'1.5rem'}}>Eat Drink Travel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/brews">Brews&Corks</Nav.Link>
                        <Nav.Link href="/food">Restaurant</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link  href="#memes">
                            <Login/>
                        </Nav.Link>
                        <Nav.Link  href="#memes">
                            <Logout/>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
            </>
        )
    }
}

export default withAuth0(Header);