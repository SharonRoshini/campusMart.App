import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

// Sample product data
const initialProducts = [
  { id: 1, name: "Product A", category: "Electronics", price: 150 },
  { id: 2, name: "Product B", category: "Clothing", price: 50 },
  { id: 3, name: "Product C", category: "Electronics", price: 300 },
  { id: 4, name: "Product D", category: "Clothing", price: 100 },
];

function SellerPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({ category: '', minPrice: 0, maxPrice: 500 });
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' });

  // Apply product filters
  const applyFilters = () => {
    return products.filter(product => (
      (filters.category ? product.category === filters.category : true) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice
    ));
  };

  // Handle form submission to add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      alert("Please fill in all fields.");
      return;
    }
    setProducts([...products, { ...newProduct, id: products.length + 1, price: parseFloat(newProduct.price) }]);
    setShowForm(false);
    setNewProduct({ name: '', category: '', price: '' });
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* Left Filter Section */}
        <Col md={3}>
          <h3>Filters</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                <option value="">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseFloat(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Col>

        {/* Right Product Section */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Your Products</h2>
            <Button variant="primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Close Form" : "Add Product"}
            </Button>
          </div>

          {/* Add Product Form */}
          {showForm && (
            <Form onSubmit={handleAddProduct} className="mb-4">
              <h3>Add a New Product</h3>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="Enter price"
                />
              </Form.Group>
              <Button variant="success" type="submit">Add Product</Button>
            </Form>
          )}

          {/* Product Display */}
          <Row>
            {applyFilters().map((product) => (
              <Col md={4} sm={6} className="mb-4" key={product.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Category: {product.category}</Card.Text>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Button variant="primary">Edit Product</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerPage;

