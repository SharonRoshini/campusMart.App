import React, { useState, useEffect } from 'react';
import { fetchProducts } from './../../services/api';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // State to control modal visibility and selected product
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
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
    <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
      <h2 className="text-center mb-4" style={{ color: '#343a40' }}>
        Available Products
      </h2>
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm" style={{ border: '1px solid #dee2e6', borderRadius: '10px' }}>
              {/* Product Image */}
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover', cursor: 'pointer', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                onClick={() => viewProductDetails(product._id)}
              />
              <Card.Body className="d-flex flex-column">
                {/* Product Name */}
                <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#495057' }}>
                  {product.name}
                </Card.Title>
                {/* Product Price */}
                <Card.Text style={{ color: '#6c757d', fontSize: '1rem' }}>
                  {product.price}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  {/* Heart Icon and Wishlist Label */}
                  <div className="d-flex align-items-center">
                    <FaHeart
                      size={18}
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
                    size="sm"
                    style={{
                      color: '#f8f9fa',
                      backgroundColor: '#6c757d', // Subtle gray matching header
                      borderColor: '#6c757d',
                    }}
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
            <Modal.Title style={{ fontSize: '1.25rem', color: '#495057' }}>Contact Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <table style={{ margin: '0 auto', fontSize: '1rem', color: '#495057' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Name:</td>
                    <td style={{ padding: '5px 10px', textAlign: 'left' }}>{selectedProduct.contactInfo.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Phone:</td>
                    <td style={{ padding: '5px 10px', textAlign: 'left' }}>{selectedProduct.contactInfo.phone}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px 10px', fontWeight: 'bold', textAlign: 'right' }}>Email:</td>
                    <td style={{ padding: '5px 10px', textAlign: 'left' }}>{selectedProduct.contactInfo.email}</td>
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
      )}
    </Container>
  );
};

export default BuyerDashboard;
