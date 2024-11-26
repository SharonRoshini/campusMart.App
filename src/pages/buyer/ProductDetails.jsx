import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from './../../services/api';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [productId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-5">{error}</h2>;
  }

  if (!product) {
    return <h2 className="text-center mt-5">Product Not Found</h2>;
  }

  return (
    <>
      <Container className="mt-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px' }}>
        <Row>
          <Col md={6}>
            <img
              src={product.imageUrl}
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
          <Col md={6}>
            <h2 style={{ color: '#495057', fontWeight: 'bold' }}>{product.name}</h2>
            <h4 style={{ color: '#6c757d' }}>${product.price}</h4>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Negotiable:</strong> {product.negotiable ? 'Yes' : 'No'}</p>
            <p><strong>Product Age:</strong> {product.age} years</p>
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
                  <td style={{ padding: '5px 10px', textAlign: 'left' }}>{product.contactInfo?.name || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Phone:</td>
                  <td style={{ padding: '5px 10px', textAlign: 'left' }}>{product.contactInfo?.phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Email:</td>
                  <td style={{ padding: '5px 10px', textAlign: 'left' }}>{product.contactInfo?.email || 'N/A'}</td>
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
