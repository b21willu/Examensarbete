import { Component } from 'inferno';
import { BrowserRouter, Route, Switch } from 'inferno-router';
import './App.css';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import MainContent from './components/MainContent.js';
import Navigation from './components/Navigation.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Header />
          <Switch>
            <Route exact path="/" component={MainContent} />
            <Route path="/products" component={ProductList} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/product/:sku" component={ProductDetail} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}
