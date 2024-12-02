import React, { useState, useEffect } from 'react';
import { fetchProducts, addToWishlist, removeFromWishlist, getWishlist } from './../../services/api';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Stores product IDs in the wishlist
  const userId = '6744d64bb94292764d48fe7f'; // Replace with the actual user ID

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products and initialize wishlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);

        const wishlistData = await getWishlist(userId);
        const userWishlist = wishlistData.wishlist.products.map((product) => product._id); // Extract product IDs
        setWishlist(userWishlist); // Set wishlist state
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data. Please try again!', { position: "top-center" });
      }
    };

    fetchData();
  }, []);

  // Toggle wishlist items (add or remove)
  const toggleWishlist = async (productId) => {
    if (wishlist.includes(productId)) {
      // Remove from wishlist
      try {
        await removeFromWishlist(userId, productId); // API call to remove
        setWishlist(wishlist.filter((id) => id !== productId)); // Update local state
        toast.info('Product removed from wishlist!', { position: "top-right" }); // Show toast notification
      } catch (error) {
        console.error('Failed to remove product from wishlist:', error);
        toast.error('Failed to remove from wishlist. Please try again!', { position: "top-right" });
      }
    } else {
      // Add to wishlist
      try {
        await addToWishlist(userId, productId); // API call to add
        setWishlist([...wishlist, productId]); // Update local state
        toast.success('Product added to wishlist!', { position: "top-right" }); // Show toast notification
      } catch (error) {
        console.error('Failed to add product to wishlist:', error);
        toast.error('Failed to add to wishlist. Please try again!', { position: "top-right" });
      }
    }
  };
  

  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Add ToastContainer for notifications */}
      <ToastContainer />

      <h2 className="text-center mb-4" style={{ color: '#343a40' }}>
        Available Products
      </h2>
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} key={product._id} className="mb-4">
            <Card className="h-100 shadow-sm" style={{ border: '1px solid #dee2e6', borderRadius: '10px' }}>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover', cursor: 'pointer', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                onClick={() => viewProductDetails(product._id)}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#495057' }}>
                  {product.name}
                </Card.Title>
                <Card.Text style={{ color: '#6c757d', fontSize: '1rem' }}>
                  {product.price}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="d-flex align-items-center">
                    <FaHeart
                      size={18}
                      color={wishlist.includes(product._id) ? '#e63946' : '#adb5bd'} // Red if in wishlist, gray otherwise
                      style={{ cursor: 'pointer', marginRight: '5px' }}
                      onClick={() => toggleWishlist(product._id)} // Toggle wishlist
                      title={wishlist.includes(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    />
                    <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>Wishlist</span>
                  </div>
                  <Button
                    variant="outline-success"
                    size="sm"
                    style={{
                      color: '#f8f9fa',
                      backgroundColor: '#6c757d',
                      borderColor: '#6c757d',
                    }}
                    onClick={() => handleShowModal(product)}
                  >
                    Contact Seller
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
                  backgroundColor: '#6c757d',
                  borderColor: '#6c757d',
                  color: '#f8f9fa',
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
