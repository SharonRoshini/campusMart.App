import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FaBell, FaHeart, FaUser, FaSearch } from "react-icons/fa";
import logo from "./../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavbarComponent = ({ userType = "buyer" }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <div className="container-fluid">
        {/* Logo Section */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Campus Mart Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          Campus Mart
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-between">
          {/* Search Bar */}
          <Form className="d-flex mx-auto w-50">
            <FormControl
              type="text"
              placeholder="Search products..."
              className="search-input me-2"
            />
            <Button variant="outline-light">
              <FaSearch />
            </Button>
          </Form>

          {/* Right Icons */}
          <Nav>
            {/* Notifications Icon */}
            <Nav.Link
              onClick={() => navigate("/notifications")}
              className="text-light"
            >
              <FaBell className="header-icon" title="Notifications" />
            </Nav.Link>

            {/* Wishlist Icon (Visible for Buyers Only) */}
            {userType === "buyer" && (
              <Nav.Link
                onClick={() => navigate("/wishlist")}
                className="text-light"
              >
                <FaHeart className="header-icon" title="Wishlist" />
              </Nav.Link>
            )}

            {/* Profile Icon */}
            <Nav.Link
              onClick={() => navigate("/personal-info")}
              className="text-light"
            >
              <FaUser className="header-icon" title="Profile" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
