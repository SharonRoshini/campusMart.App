import React from 'react';
import products from './api';  // Importing the product data from api.js
import { Card, Button, Container, Row, Col } from 'react-bootstrap';  // React-Bootstrap components

const Product = () => {
  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm" style={{ borderRadius: '10px' }}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {product.name}
                </Card.Title>
                <Card.Text style={{ color: '#888', fontSize: '1rem' }}>
                  {product.price}
                </Card.Text>
                <Button variant="primary" className="mt-auto" style={{ backgroundColor: '#0b5ed7', border: 'none' }}>
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Product;
