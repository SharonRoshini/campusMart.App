import React, { useState } from 'react';

// Sample product data
const initialProducts = [
  { id: 1, name: "Product A", category: "Electronics", price: 150 },
  { id: 2, name: "Product B", category: "Clothing", price: 50 },
  // Add more products here...
];

function SellerPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({ category: '', minPrice: 0, maxPrice: 500 });
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' });

  // Handler to filter products
  const applyFilters = () => {
    return products.filter(product => (
      (filters.category ? product.category === filters.category : true) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice
    ));
  };

  // Handle form submission to add a product
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
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Left Filter Section */}
      <div style={{ width: "20%", border: "1px solid #ccc", padding: "20px" }}>
        <h3>Filters</h3>
        <div>
          <label>Category: </label>
          <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label>Min Price: </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
        </div>
        <div>
          <label>Max Price: </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Right Main Section */}
      <div style={{ width: "75%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Your Products</h2>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Product"}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <form onSubmit={handleAddProduct} style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
            <h3>Add a New Product</h3>
            <div>
              <label>Product Name: </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div>
              <label>Category: </label>
              <select onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} value={newProduct.category}>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div>
              <label>Price: </label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
            <button type="submit">Add Product</button>
          </form>
        )}

        {/* Product Display Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px" }}>
          {applyFilters().map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <h4>{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
