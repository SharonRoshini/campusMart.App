// BuyerHeader.jsx
import React from 'react';
import { Container, Row, Col, Form, Dropdown, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const BuyerHeader = () => {
  return (
    <Container fluid className="bg-white shadow-sm py-3 rounded">
      <Row className="align-items-center">
        {/* City Dropdown */}
        <Col xs={2}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
              Residence
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Student Housing</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Canterbury Greens</Dropdown.Item>
              <Dropdown.Item href="#/action-3">St. Joe's</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Keyword Search */}
        <Col xs={3}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search anything in CampusMart..."
              aria-label="Search anything in CampusMart"
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>

        {/* Neighborhood Input */}
        <Col xs={2}>
          <InputGroup>
            <Form.Control type="text" placeholder="Enter location" aria-label="Enter location" />
            <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
          </InputGroup>
        </Col>

        {/* Price Filter */}
        <Col xs={2}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
              Price (USD)
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">0 - 25</Dropdown.Item>
              <Dropdown.Item href="#/action-2">25 - 50</Dropdown.Item>
              <Dropdown.Item href="#/action-3">50+</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Filters Dropdown */}
        <Col xs={3}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
              Filters
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Condition</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Category</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Sort By</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyerHeader;
