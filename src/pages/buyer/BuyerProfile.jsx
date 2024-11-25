import React from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';

const BuyerProfile = () => {
  const buyerInfo = {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St, Anytown, USA",
    purchaseHistory: [
      { id: 1, name: "Product A", price: 150 },
      { id: 2, name: "Product B", price: 50 },
    ],
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Buyer Profile</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{buyerInfo.name}</Card.Title>
          <Card.Text>Email: {buyerInfo.email}</Card.Text>
          <Card.Text>Address: {buyerInfo.address}</Card.Text>
          <Button variant="primary">Edit Profile</Button>
        </Card.Body>
      </Card>

      <h3>Purchase History</h3>
      <ListGroup>
        {buyerInfo.purchaseHistory.map((item) => (
          <ListGroup.Item key={item.id}>
            {item.name} - ${item.price}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default BuyerProfile;
