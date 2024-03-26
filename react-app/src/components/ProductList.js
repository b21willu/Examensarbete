import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [limit] = useState(400);
  const [filterTerm, setFilterTerm] = useState(null);

  useEffect(() => {
    let apiUrl = 'http://localhost:3001/api/products';
    if (filterTerm) {
      apiUrl += `?term=${filterTerm}`;
    }
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Filter out products with null or empty image_downloads
        const filteredProducts = data.filter(product => product.image_downloads !== null && product.image_downloads.length > 0);

        // Loop through the filtered products and clean up the image_downloads
        const cleanedProducts = filteredProducts.map(product => {
          return {
            ...product,
            // Remove [ and ' from image_downloads
            image_downloads: product.image_downloads.replace(/[\[\]']/g, '').split(', ')
          };
        });
        setProducts(cleanedProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [limit, filterTerm]);

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const filterProducts = (product) => {
    if (!filterTerm) return true; // Om ingen term är vald, returnera true för att visa alla produkter
    return product.terms.includes(filterTerm);
  };

  return (
    <div>
      <h1>Produkter</h1>
      <div>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" onChange={handleFilterChange}>
          <option value="">Alla</option>
          <option value="backpack">Ryggsäck</option>
          <option value="bags">Väskor</option>
          <option value="cardigans">Cardigans</option>
          <option value="cargo">Cargo</option>
          <option value="dresses">Klänningar</option>
          <option value="hoodies">Hoodies</option>
          <option value="jackets">Jackor</option>
          <option value="jeans">Jeans</option>
          <option value="knitwear">Knitwear</option>
          <option value="linen">Linen</option>
          <option value="pants">Byxor</option>
          <option value="puffers">Puffers</option>
          <option value="shoes">Skor</option>
          <option value="shorts">Shorts</option>
          <option value="skirts">Kjolar</option>
          <option value="suits">Kavaj</option>
          <option value="sweaters">Sweaters</option>
          <option value="t-shirts">T-shirts</option>
          <option value="tops">Toppar</option>
        </select>
      </div>
      <div className="product-list">
        {products.filter(filterProducts).map(product => (
        <div key={product.sku} className="product">
          <Link to={`/product/${product.sku}`}>
            {product.image_downloads.length > 0 ? (
              <img
                src={require(`../../../mango/${product.image_downloads[0]}.jpg`)}
                alt={product.name}
                className="product-content"
                id="product-image"
              />
            ) : (
              <div>No Image Available</div>
            )}
          </Link>
          <p className="product-content">{product.name}</p>
          <p className="product-content">Pris: {product.price} {product.currency}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;