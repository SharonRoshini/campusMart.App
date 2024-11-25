import React, { useState } from 'react';
import products from './../../services/api'; // Import the products data
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // FontAwesome Heart Icon

const BuyerDashboard = () => {
  const navigate = useNavigate();

  // State to manage the wishlist
  const [wishlist, setWishlist] = useState([]);

  // Navigate to product details page
  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handle Wishlist Toggle
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId)); // Remove from wishlist
    } else {
      setWishlist([...wishlist, productId]); // Add to wishlist
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Available Products</h2>
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              {/* Product Image */}
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => viewProductDetails(product.id)} // Navigate to details on click
              />
              <Card.Body className="d-flex flex-column">
                {/* Product Name */}
                <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {product.name}
                </Card.Title>
                {/* Product Price */}
                <Card.Text style={{ color: '#888', fontSize: '1rem' }}>
                  {product.price}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  {/* Heart Icon for Wishlist */}
                  <FaHeart
                    size={18}
                    color={wishlist.includes(product.id) ? 'red' : 'gray'} // Highlight if in wishlist
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleWishlist(product.id)} // Toggle wishlist on click
                    title={
                      wishlist.includes(product.id)
                        ? 'Remove from Wishlist'
                        : 'Add to Wishlist'
                    }
                  />
                  {/* Contact Seller Button */}
                  <Button variant="outline-success" size="sm">
                    Contact Seller
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyerDashboard;
