import React, { useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import { FaBell, FaHeart, FaUser } from "react-icons/fa";

const BuyerProfile = ({ userType = "buyer" }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  // Example user data
  const userInfo = {
    fullName: "John Doe",
    email: "john@example.com",
    location: "123 Main St, Anytown, USA",
    notifications: ["Your order has been shipped!", "Welcome to our platform!"],
    wishlist: [
      { id: 1, name: "Product X", price: 200 },
      { id: 2, name: "Product Y", price: 300 },
    ],
  };

  // Render Profile Section
  const renderProfile = () => (
    <Card className="shadow-sm profile-card">
      <Card.Body>
        <Card.Title>Edit Profile</Card.Title>
        <Card.Text>
          <strong>Full Name:</strong> {userInfo.fullName}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {userInfo.email}
        </Card.Text>
        <Card.Text>
          <strong>Location:</strong> {userInfo.location}
        </Card.Text>
        <Button variant="primary" className="rounded-pill">
          Edit Info
        </Button>
      </Card.Body>
    </Card>
  );

  // Render Notifications
  const renderNotifications = () => (
    <Modal show={showNotifications} onHide={() => setShowNotifications(false)}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userInfo.notifications.length > 0 ? (
          <ListGroup>
            {userInfo.notifications.map((notif, index) => (
              <ListGroup.Item key={index} className="notification-item">
                {notif}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No notifications yet!</p>
        )}
      </Modal.Body>
    </Modal>
  );

  // Render Wishlist
  const renderWishlist = () => (
    <Modal show={showWishlist} onHide={() => setShowWishlist(false)}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Wishlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userInfo.wishlist.length > 0 ? (
          <ListGroup>
            {userInfo.wishlist.map((item) => (
              <ListGroup.Item key={item.id} className="wishlist-item">
                <div className="d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span className="text-muted">${item.price}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No items in your wishlist!</p>
        )}
      </Modal.Body>
    </Modal>
  );

  return (
    <Container fluid>
      {/* Header */}
      <Row className="header py-3 px-4 shadow-sm">
        <Col className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Buyer Profile</h4>
          <div className="d-flex align-items-center">
            {/* Notification Icon */}
            <FaBell
              size={24}
              className="icon-style me-3"
              onClick={() => setShowNotifications(true)}
            />
            {/* Wishlist Icon */}
            {userType === "buyer" && (
              <FaHeart
                size={24}
                className="icon-style me-3"
                onClick={() => setShowWishlist(true)}
              />
            )}
            {/* Profile Icon */}
            <FaUser
              size={24}
              className="icon-style"
              onClick={() => setActiveSection("profile")}
            />
          </div>
        </Col>
      </Row>

      {/* Content */}
      <Row className="mt-4">
        <Col md={12}>
          {activeSection === "profile" && renderProfile()}
        </Col>
      </Row>

      {/* Modals */}
      {renderNotifications()}
      {renderWishlist()}
    </Container>
  );
};

export default BuyerProfile;
