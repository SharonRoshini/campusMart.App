import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="font-weight-bold">
          <i className="fas fa-store fa-lg mr-2"></i> MyMarket
        </Navbar.Brand>

        {/* Search bar (centered) */}
        <Form inline="true" className="mx-auto w-50">
          <FormControl
            type="text"
            placeholder="Search products..."
            className="mr-2"
            style={{ borderRadius: "20px" }}
          />
          <Button variant="outline-light">
            <i className="fas fa-search"></i>
          </Button>
        </Form>

        {/* Profile and Choose Role Links */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/profile" className="d-flex align-items-center mx-2">
              <i className="fas fa-user-circle fa-lg mr-1"></i> Profile
            </Nav.Link>
            <Nav.Link href="/choose-role" className="d-flex align-items-center mx-2">
              <i className="fas fa-user-tag fa-lg mr-1"></i> Choose Role
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
