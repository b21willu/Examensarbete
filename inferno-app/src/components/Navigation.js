import { Component } from 'inferno';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a>Hem</a></li>
          <li><a>Produkter</a></li>
          <li><a>Om oss</a></li>
          <li><a>Kontakt</a></li>
          <li></li>
        </ul>
    </nav>
    );
  }
}

export default Navigation;