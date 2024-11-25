import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from './../../services/api'; // Your product data
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  // State to control the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Toggle the modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!product) {
    return <h2 className="text-center mt-5">Product Not Found</h2>;
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <img
              src={product.image}
              alt={product.name}
              style={{ height: '70%', width: '80%', borderRadius: '10px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6}>
            <h2>{product.name}</h2>
            <h4 style={{ color: '#555' }}>{product.price}</h4>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Negotiable:</strong> {product.negotiable ? 'Yes' : 'No'}</p>
            <p><strong>Product Age:</strong> {product.age}</p>
            <p><strong>Contact:</strong> {product.contact}</p>
            <p><strong>Location:</strong> {product.location}</p>
            <p><strong>Available Till:</strong> {product.availableTill}</p>
            <p>{product.description}</p>
            <div className="d-flex gap-2 mt-4">
              <FaHeart
                size={22}
                color="red"
                style={{ cursor: 'pointer' }}
                title="Add to Wishlist"
              />
              <Button variant="success" onClick={handleShowModal}>
                Contact Seller
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Contact Info */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5><strong>Name:</strong> {product.contactInfo.name}</h5>
          <h5><strong>Phone Number:</strong> {product.contactInfo.phone}</h5>
          <h5><strong>Email:</strong> {product.contactInfo.email}</h5>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="primary" onClick={handleCloseModal}>
              Send Notification
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductDetail;
