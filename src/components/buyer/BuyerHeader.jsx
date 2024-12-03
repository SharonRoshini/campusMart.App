import React, { useState } from "react";
import { Card, Badge, Accordion, Button, Modal, ListGroup, Form } from "react-bootstrap";
import {
  Home,
  DollarSign,
  Package,
  Clock,
  Activity,
  Grid,
  Filter,
  Bell,
  Heart,
  User,
} from "lucide-react";
import { 
  RESIDENCE_OPTIONS, 
  PRICE_OPTIONS, 
  CONDITION_OPTIONS, 
  USAGE_OPTIONS, 
  AGE_OPTIONS, 
  CATEGORY_OPTIONS 
} from "../../constants/options";

const BuyerHeader = ({ userType = "buyer" }) => {
  const [selectedResidence, setSelectedResidence] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedUsage, setSelectedUsage] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const userInfo = {
    notifications: ["Order #123 has shipped", "New promotional offer available!"],
    wishlist: [
      { id: 1, name: "Product A", price: "$150" },
      { id: 2, name: "Product B", price: "$200" },
    ],
  };

  const handleCheckboxChange = (selectedValues, setSelectedValues) => (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    setSelectedValues(updatedValues);
  };

  const handleClearFilters = () => {
    setSelectedResidence([]);
    setSelectedPriceRange([]);
    setSelectedCondition([]);
    setSelectedUsage([]);
    setSelectedAge([]);
    setSelectedCategory([]);
  };

  const getTotalSelectedFilters = () => {
    return [
      selectedResidence,
      selectedPriceRange,
      selectedCondition,
      selectedUsage,
      selectedAge,
      selectedCategory,
    ].reduce((acc, curr) => acc + curr.length, 0);
  };

  const renderNotificationsModal = () => (
    <Modal show={showNotifications} onHide={() => setShowNotifications(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userInfo.notifications.length ? (
          <ListGroup>
            {userInfo.notifications.map((notif, index) => (
              <ListGroup.Item key={index}>{notif}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No notifications available.</p>
        )}
      </Modal.Body>
    </Modal>
  );

  const renderWishlistModal = () => (
    <Modal show={showWishlist} onHide={() => setShowWishlist(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Wishlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userInfo.wishlist.length ? (
          <ListGroup>
            {userInfo.wishlist.map((item) => (
              <ListGroup.Item key={item.id}>
                {item.name} - {item.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </Modal.Body>
    </Modal>
  );

  return (
    <div>
      {/* Common Header */}
      <div className="header d-flex justify-content-between align-items-center p-3 shadow-sm">
        <div className="d-flex align-items-center">
          <Filter className="me-2" size={20} />
          <h5 className="mb-0" style={{ fontWeight: "bold", color: "#007bff" }}>
            Filters
          </h5>
        </div>

        {/* Icons Section */}
        <div className="d-flex align-items-center">
          <Bell
            className="icon me-3"
            size={24}
            onClick={() => setShowNotifications(true)}
            title="Notifications"
          />
          {userType === "buyer" && (
            <Heart
              className="icon me-3"
              size={24}
              onClick={() => setShowWishlist(true)}
              title="Wishlist"
            />
          )}
          <User className="icon" size={24} title="Edit Profile" />
        </div>
      </div>

      {/* Filter Sidebar */}
      <Card className="shadow-sm border-0 mt-3" style={{ width: "280px" }}>
        <Card.Body className="p-0">
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Home size={16} className="me-2" /> Residence
              </Accordion.Header>
              <Accordion.Body>
                <CheckboxGroup
                  options={RESIDENCE_OPTIONS}
                  selectedValues={selectedResidence}
                  onChange={handleCheckboxChange(selectedResidence, setSelectedResidence)}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <DollarSign size={16} className="me-2" /> Price Range
              </Accordion.Header>
              <Accordion.Body>
                <CheckboxGroup
                  options={PRICE_OPTIONS}
                  selectedValues={selectedPriceRange}
                  onChange={handleCheckboxChange(selectedPriceRange, setSelectedPriceRange)}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <Activity size={16} className="me-2" /> Condition
              </Accordion.Header>
              <Accordion.Body>
                <CheckboxGroup
                  options={CONDITION_OPTIONS}
                  selectedValues={selectedCondition}
                  onChange={handleCheckboxChange(selectedCondition, setSelectedCondition)}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <Package size={16} className="me-2" /> Usage
              </Accordion.Header>
              <Accordion.Body>
                <CheckboxGroup
                  options={USAGE_OPTIONS}
                  selectedValues={selectedUsage}
                  onChange={handleCheckboxChange(selectedUsage, setSelectedUsage)}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <Clock size={16} className="me-2" /> Age
              </Accordion.Header>
              <Accordion.Body>
                <CheckboxGroup
                  options={AGE_OPTIONS}
                  selectedValues={selectedAge}
                  onChange={handleCheckboxChange(selectedAge, setSelectedAge)}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <Grid size={16} className="me-2" /> Category
              </Accordion.Header>
              <Accordion.Body>
                <CheckboxGroup
                  options={CATEGORY_OPTIONS}
                  selectedValues={selectedCategory}
                  onChange={handleCheckboxChange(selectedCategory, setSelectedCategory)}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
        {getTotalSelectedFilters() > 0 && (
          <Card.Footer className="bg-white border-top-0 p-3">
            <Button
              variant="outline-secondary"
              size="sm"
              className="w-100"
              onClick={handleClearFilters}
            >
              Clear All Filters ({getTotalSelectedFilters()})
            </Button>
          </Card.Footer>
        )}
      </Card>

      {/* Modals */}
      {renderNotificationsModal()}
      {renderWishlistModal()}
    </div>
  );
};

const CheckboxGroup = ({ options, selectedValues, onChange }) => (
  <div className="px-2">
    {options.map(({ label, value }) => (
      <Form.Check
        key={value}
        type="checkbox"
        className="mb-2 custom-checkbox"
        label={
          <span className="d-flex justify-content-between w-100">
            {label}
            {selectedValues.includes(value) && (
              <Badge bg="primary" pill className="ms-2">
                ✓
              </Badge>
            )}
          </span>
        }
        checked={selectedValues.includes(value)}
        onChange={() => onChange(value)}
      />
    ))}
  </div>
);

export default BuyerHeader;
