import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import logo from "./../../assets/logo.png";
import { FaSearch } from 'react-icons/fa';
import { RiUserHeartFill } from "react-icons/ri";
import { BiSolidSelectMultiple } from "react-icons/bi";
import './../../styles/style.css';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container fluid>
        {/* Logo and Brand Name */}
        <Navbar.Brand href="/" className="font-weight-bold d-flex flex-column align-items-center">
          <img 
            src={logo}
            alt="Campus Mart Logo" 
            className="navbar-brand-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarSearchAndLinks" />
        <Navbar.Collapse id="navbarSearchAndLinks" className="justify-content-between">
          {/* Simple Search Bar */}
          <Form className="d-flex mx-auto search-bar-container">
            <FormControl
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
           <Button variant="light" className="search-button">
            <FaSearch />
          </Button>
          </Form>

          {/* Profile and Choose Role Links */}
          <Nav>
            <Nav.Link href="/profile" className="d-flex flex-column align-items-center mx-2">
              <RiUserHeartFill className="nav-link-icon" />
              <span className="nav-link-text">Profile</span>
            </Nav.Link>
            <Nav.Link href="/choose-role" className="d-flex flex-column align-items-center mx-2">
              <BiSolidSelectMultiple className="nav-link-icon" />
              <span className="nav-link-text">Choose Role</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
