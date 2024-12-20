import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Alert, Row, Col, Image, Card } from 'react-bootstrap';
import { getNotifications, getProductDetailsById } from './../../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState({});  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications('buyer');  
        setNotifications(data);
      } catch (error) {
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const product = await getProductDetailsById(productId);  
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productId]: product,  
      }));
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Notifications</h2>
      
      {loading && <Alert variant="info">Loading notifications...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification, index) => {
            const productId = notification.productId._id;
            const product = productDetails[productId];

  
            if (!product) {
              fetchProductDetails(productId);
            }

            return (
              <Col xs={12} md={6} key={notification._id} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Row className="mb-3">
                      <Col xs={12}>
                        <strong>{notification.message}</strong> 
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={4} md={3}>
                        {product && product.imageUrl && (
                          <Image 
                            src={product.imageUrl} 
                            alt="Product Image" 
                            fluid 
                            style={{ height: '120px', width: 'auto' }}  
                          />
                        )}
                      </Col>
                      <Col xs={8} md={9}>
                        <Row className="mb-2">
                          <Col xs={12}>
                            <h5>{product ? product.name : 'Loading...'} </h5>
                            <p><strong>Price:</strong> ${product ? product.price : 'N/A'}</p>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col xs={12}>
                            <p><strong>Seller Name:</strong> {notification.sellerId ? notification.sellerId.name : 'N/A'}</p>
                            <p><strong>Seller Email:</strong> {notification.sellerId ? notification.sellerId.email : 'N/A'}</p>
                          </Col>
                        </Row>


                        <Row>
                          <Col xs={12}>
                            <p><strong>Description:</strong> {product ? product.description : 'N/A'}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <ListGroup.Item>No notifications found.</ListGroup.Item>
        )}
      </Row>
    </Container>
  );
};

export default Notifications;
