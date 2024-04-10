import { Component } from 'inferno';
import { Link } from 'inferno-router';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      images: {} // Förvara bilder i state
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products`);
      const data = await response.json();
  
      // Skapa ett tomt objekt för att lagra bilder för varje produkt
      const images = {};
  
      // Gå igenom varje produkt för att samla in bilder
      await Promise.all(data.map(async product => {
        if (product.image_downloads && typeof product.image_downloads === 'string') {
          // Rengör strängen för att ta bort [ ] och ''
          const cleanedImageDownloads = product.image_downloads.replace(/[[\]']/g, '');
  
          // Dela upp strängen och hämta alla bilder
          const imagesList = cleanedImageDownloads.split(',');
          const imagePromises = imagesList.map(async imageName => {
            // Dynamiskt importera bilderna
            try {
              const { default: image } = await import(`../../../mango/${imageName}.jpg`);
              return image;
            } catch (error) {
              return null;
            }
          });
  
          // Vänta på alla bilder att hämtas och spara dem i state
          images[product.sku] = await Promise.all(imagePromises);
        }
      }));
  
      // Uppdatera state med bilder för varje produkt
      this.setState({ products: data, images });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  render() {
    return (
      <div>
        <div className="product-list">
          {this.state.products.map(product => (
            <div key={product.sku} className="product">
              {this.state.images[product.sku] && (
                <Link to={`/product/${product.sku}`}>
                  <img
                    src={this.state.images[product.sku][0]}
                    alt={product.name} 
                    className="product-content"
                    id="product-image"
                  />
                </Link>
              )}
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