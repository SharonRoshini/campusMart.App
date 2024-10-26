import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

const BuyerHeader = () => {
  return (
    <Container fluid className="bg-white shadow-sm py-3 rounded">
      <Row className="align-items-center justify-content-center">
        {/* Residence Dropdown */}
        <Col xs={2} className="text-center">
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

        {/* Price Filter */}
        <Col xs={2} className="text-center">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
              Price (USD)
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">0 - 10</Dropdown.Item>
              <Dropdown.Item href="#/action-2">10 - 20</Dropdown.Item>
              <Dropdown.Item href="#/action-3">20 - 40</Dropdown.Item>
              <Dropdown.Item href="#/action-3">40 - 50</Dropdown.Item>
              <Dropdown.Item href="#/action-3">50+</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

                {/* Filters Dropdown */}
        <Col xs={2} className="text-center">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
              Filters
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Condition Submenu */}
              <Dropdown drop="end">
                <Dropdown.Toggle variant="light" className="dropdown-item w-100 text-start">
                  Condition
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/flawless">Flawless</Dropdown.Item>
                  <Dropdown.Item href="#/good">Good</Dropdown.Item>
                  <Dropdown.Item href="#/average">Average</Dropdown.Item>
                  <Dropdown.Item href="#/poor">Poor</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Usage Submenu */}
              <Dropdown drop="end">
                <Dropdown.Toggle variant="light" className="dropdown-item w-100 text-start">
                  Usage
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/never-used">Never Used</Dropdown.Item>
                  <Dropdown.Item href="#/used-once">Used Once</Dropdown.Item>
                  <Dropdown.Item href="#/light-usage">Light Usage</Dropdown.Item>
                  <Dropdown.Item href="#/normal-usage">Normal Usage</Dropdown.Item>
                  <Dropdown.Item href="#/heavy-usage">Heavy Usage</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Age Submenu */}
              <Dropdown drop="end">
                <Dropdown.Toggle variant="light" className="dropdown-item w-100 text-start">
                  Age
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/brand-new">Brand New</Dropdown.Item>
                  <Dropdown.Item href="#/0-1month">0-1 month</Dropdown.Item>
                  <Dropdown.Item href="#/1-3month">1-3 months</Dropdown.Item>
                  <Dropdown.Item href="#/1-6months">1-6 months</Dropdown.Item>
                  <Dropdown.Item href="#/6-12months">6-12 months</Dropdown.Item>
                  <Dropdown.Item href="#/1year">1 year+</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Category Dropdown */}
        <Col xs={2} className="text-center">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
              Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/kitchen">Kitchen</Dropdown.Item>
              <Dropdown.Item href="#/appliances">Appliances</Dropdown.Item>
              <Dropdown.Item href="#/electronics">Electronics</Dropdown.Item>
              <Dropdown.Item href="#/furniture">Furniture</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyerHeader;
