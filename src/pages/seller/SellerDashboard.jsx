import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';

const initialProducts = [
  { id: 1, name: "Product A", category: "Electronics", price: 150, negotiable: true, description: "Good condition", age: "1 year", contact: "1234567890", location: "New York", availableTill: "2024-12-31" },
  { id: 2, name: "Product B", category: "Clothing", price: 50, negotiable: false, description: "Brand new", age: "2 months", contact: "9876543210", location: "Los Angeles", availableTill: "2024-11-15" },
];

function SellerPage() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    negotiable: false,
    ageYears: '',
    ageMonths: '',
    ageDays: '',
    description: '',
    contact: '',
    location: '',
    availableTill: '',
    images: []
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle file input for multiple images
  const handleFileChange = (e) => {
    setNewProduct({
      ...newProduct,
      images: Array.from(e.target.files),
    });
  };

  // Handle form submission to add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const productAge = `${newProduct.ageYears} years, ${newProduct.ageMonths} months, ${newProduct.ageDays} days`;
    const newProductData = {
      ...newProduct,
      id: products.length + 1,
      age: productAge,
    };
    setProducts([...products, newProductData]);
    setShowForm(false);  // Close the modal after submitting
    setNewProduct({
      name: '',
      category: '',
      price: '',
      negotiable: false,
      ageYears: '',
      ageMonths: '',
      ageDays: '',
      description: '',
      contact: '',
      location: '',
      availableTill: '',
      images: []
    });
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Products</h2>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Add Product
        </Button>
      </div>

      {/* Product Display */}
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} className="mb-4" key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Negotiable: {product.negotiable ? 'Yes' : 'No'}</Card.Text>
                <Card.Text>Age: {product.age}</Card.Text>
                <Card.Text>Description: {product.description}</Card.Text>
                <Card.Text>Contact: {product.contact}</Card.Text>
                <Card.Text>Location: {product.location}</Card.Text>
                <Card.Text>Available Till: {product.availableTill}</Card.Text>
                <Button variant="primary">Edit Product</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Product Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add a New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Negotiable</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="negotiable"
                    checked={newProduct.negotiable}
                    onChange={handleChange}
                    label="Is negotiable?"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Age (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="ageYears"
                    value={newProduct.ageYears}
                    onChange={handleChange}
                    placeholder="Years"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Age (Months)</Form.Label>
                  <Form.Control
                    type="number"
                    name="ageMonths"
                    value={newProduct.ageMonths}
                    onChange={handleChange}
                    placeholder="Months"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Age (Days)</Form.Label>
                  <Form.Control
                    type="number"
                    name="ageDays"
                    value={newProduct.ageDays}
                    onChange={handleChange}
                    placeholder="Days"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    name="condition"
                    value={newProduct.condition}
                    onChange={handleChange}
                    placeholder="Enter condition"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Usage</Form.Label>
                  <Form.Control
                    type="text"
                    name="usage"
                    value={newProduct.usage}
                    onChange={handleChange}
                    placeholder="Enter usage"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Available Till</Form.Label>
                  <Form.Control
                    type="date"
                    name="availableTill"
                    value={newProduct.availableTill}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Info</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={newProduct.contact}
                    onChange={handleChange}
                    placeholder="Enter contact info"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={newProduct.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    name="images"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="success" type="submit">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
}

export default SellerPage;
