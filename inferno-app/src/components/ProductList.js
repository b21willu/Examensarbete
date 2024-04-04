import { Component } from 'inferno';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products`);
      console.log(response); // Logga response-objektet för att felsöka
      const data = await response.json();
      this.setState({ products: data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  render() {
    return (
      <div>
        <h1>Produkter</h1>
        <div className="product-list">
          {this.state.products.map(product => (
            <div key={product.sku} className="product">
              <h3>{product.name}</h3>
              <p className="product-content">{product.name}</p>
              <p className="product-content">Pris: {product.price} {product.currency}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;