import React from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';

const SellerProfile = () => {
  const sellerInfo = {
    name: "Jane Smith",
    email: "jane@example.com",
    productsListed: [
      { id: 1, name: "Product A", price: 150 },
      { id: 2, name: "Product B", price: 50 },
    ],
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Seller Profile</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{sellerInfo.name}</Card.Title>
          <Card.Text>Email: {sellerInfo.email}</Card.Text>
          <Button variant="primary">Edit Profile</Button>
        </Card.Body>
      </Card>

      <h3>Products Listed</h3>
      <ListGroup>
        {sellerInfo.productsListed.map((product) => (
          <ListGroup.Item key={product.id}>
            {product.name} - ${product.price}
            <Button variant="link" className="float-end">Edit</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SellerProfile;
