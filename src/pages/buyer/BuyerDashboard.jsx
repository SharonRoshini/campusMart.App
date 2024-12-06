import React, { useState, useEffect } from 'react';
import { fetchProducts, addToWishlist, removeFromWishlist, getWishlist } from './../../services/api';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import '../../styles/buyerDashboard.css';

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
        toast.error('Failed to load data. Please try again!', { position: 'top-center' });
      }
    };

    fetchData();
  }, []);

  // Toggle wishlist items (add or remove)
  const toggleWishlist = async (productId) => {
    if (wishlist.includes(productId)) {
      try {
        await removeFromWishlist(userId, productId);
        setWishlist(wishlist.filter((id) => id !== productId));
        toast.info('Product removed from wishlist!', { position: 'top-right' });
      } catch (error) {
        console.error('Failed to remove product from wishlist:', error);
        toast.error('Failed to remove from wishlist. Please try again!', { position: 'top-right' });
      }
    } else {
      try {
        await addToWishlist(userId, productId);
        setWishlist([...wishlist, productId]);
        toast.success('Product added to wishlist!', { position: 'top-right' });
      } catch (error) {
        console.error('Failed to add product to wishlist:', error);
        toast.error('Failed to add to wishlist. Please try again!', { position: 'top-right' });
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
    <Container className="mt-5">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <h2>Available Products</h2>
      </div>

      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} className="mb-4" key={product._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
                className="card-img"
                onClick={() => viewProductDetails(product._id)}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaHeart
                      size={18}
                      color={wishlist.includes(product._id) ? '#e63946' : '#adb5bd'}
                      className="wishlist-icon"
                      onClick={() => toggleWishlist(product._id)}
                      title={wishlist.includes(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    />
                    <span className="wishlist-label">Wishlist</span>
                  </div>
                  <Button variant="primary" onClick={() => handleShowModal(product)}>
                    Contact Seller
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Contact Seller Modal */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Contact Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tbody>
                <tr>
                  <td className="label">Name:</td>
                  <td className="value">Divya Avuti</td>
                </tr>
                <tr>
                  <td className="label">Phone:</td>
                  <td className="value">7093728808</td>
                </tr>
                <tr>
                  <td className="label">Email:</td>
                  <td className="value">why@gmail.com</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={handleCloseModal}>Send Notification</Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      <ToastContainer />
    </Container>
  );
};

export default BuyerDashboard;
