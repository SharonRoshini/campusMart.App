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

  // State for wishlist
  const [wishlist, setWishlist] = useState([]);

  // Toggle the modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Wishlist toggle functionality
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId)); // Remove from wishlist
    } else {
      setWishlist([...wishlist, productId]); // Add to wishlist
    }
  };

  if (!product) {
    return <h2 className="text-center mt-5" style={{ color: '#343a40' }}>Product Not Found</h2>;
  }

  return (
    <>
      <Container className="mt-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px' }}>
        <Row>
          {/* Product Image */}
          <Col md={6}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                height: '70%',
                width: '80%',
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Col>

          {/* Product Details */}
          <Col md={6}>
            <h2 style={{ color: '#495057', fontWeight: 'bold' }}>{product.name}</h2>
            <h4 style={{ color: '#6c757d' }}>{product.price}</h4>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Negotiable:</strong> {product.negotiable ? 'Yes' : 'No'}</p>
            <p><strong>Product Age:</strong> {product.age}</p>
            <p><strong>Contact:</strong> {product.contact}</p>
            <p><strong>Location:</strong> {product.location}</p>
            <p><strong>Available Till:</strong> {product.availableTill}</p>
            <p>{product.description}</p>
            <div className="d-flex gap-3 align-items-center mt-4">
              {/* Heart Icon for Wishlist */}
              <div className="d-flex align-items-center">
                <FaHeart
                  size={22}
                  color={wishlist.includes(product.id) ? '#e63946' : '#adb5bd'} // Subtle gray or red
                  style={{ cursor: 'pointer', marginRight: '5px' }}
                  onClick={() => toggleWishlist(product.id)} // Toggle wishlist on click
                  title={
                    wishlist.includes(product.id)
                      ? 'Remove from Wishlist'
                      : 'Add to Wishlist'
                  }
                />
                <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>Add to Wishlist</span>
              </div>

              {/* Contact Seller Button */}
              <Button
                variant="outline-success"
                style={{
                  color: '#f8f9fa',
                  backgroundColor: '#6c757d', // Subtle gray matching header
                  borderColor: '#6c757d',
                }}
                onClick={handleShowModal}
              >
                Contact Seller
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Contact Info */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.25rem', color: '#495057' }}>Contact Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <table style={{ margin: '0 auto', fontSize: '1rem', color: '#495057' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Name:</td>
                  <td style={{ padding: '5px 10px', textAlign: 'left' }}>{product.contactInfo.name}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Phone:</td>
                  <td style={{ padding: '5px 10px', textAlign: 'left' }}>{product.contactInfo.phone}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Email:</td>
                  <td style={{ padding: '5px 10px', textAlign: 'left' }}>{product.contactInfo.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              style={{
                backgroundColor: '#6c757d', // Subtle gray matching header
                borderColor: '#6c757d',
                color: '#f8f9fa', // Light text
              }}
              onClick={handleCloseModal}
            >
              Send Notification
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductDetail;
