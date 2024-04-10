import { Component } from 'inferno';
import { Link } from 'inferno-router';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Hem</Link></li>
          <li><Link to="/products">Produkter</Link></li>
          <li><Link to="/about">Om oss</Link></li>
          <li><Link to="/contact">Kontakt</Link></li>
          <li><Link to="/kundvagn">Kundvagn</Link></li>
        </ul>
    </nav>
    );
  }
}

export default Navigation;