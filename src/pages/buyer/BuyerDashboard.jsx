import React, { useState } from 'react';
import products from './../../services/api'; // Import the products data
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // FontAwesome Heart Icon

const BuyerDashboard = () => {
  const navigate = useNavigate();

  // State to manage the wishlist
  const [wishlist, setWishlist] = useState([]);
  
  // State to control modal visibility and selected product
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Show Modal with contact info
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <Container fluid className="py-4">
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
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleShowModal(product)} // Show contact info modal
                  >
                    Contact Seller
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Contact Info */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Contact Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5><strong>Name:</strong> {selectedProduct.contactInfo.name}</h5>
            <h5><strong>Phone Number:</strong> {selectedProduct.contactInfo.phone}</h5>
            <h5><strong>Email:</strong> {selectedProduct.contactInfo.email}</h5>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" onClick={handleCloseModal}>
                Send Notification
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default BuyerDashboard;
